import { startSession } from 'mongoose';
import config from '../../config';
import TAcademicSemester from '../academicSemester/academicSemester.interface';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import TUser from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // year semesterCode 4 digit number transfered to utils folder

  // find academic semester info
  const academicSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  const session = await startSession();
  try {
    // starting session
    session.startTransaction();

    const userData: Partial<TUser> = {
      id: await generateStudentId(academicSemester as TAcademicSemester),
      password: password || (config.defaultPasswordForUser as string),
      role: 'Student',
    };

    // transaction-1
    const newUser = await UserModel.create([userData], { session }); //for session user data should be passed as an array
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // Transaction -2
    const newStudent = await StudentModel.create([payload], { session }); //payload is passed as an array.

    if (!newStudent.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create Student');
    }
    // saving the session as all failed
    await session.commitTransaction();
    await session.endSession()

    return newStudent;
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "User and Student not created.")
  }
};



export const UserService = {
  createStudentIntoDB,
  // createFacultyIntoDB,
  // createAdminIntoDB,
};

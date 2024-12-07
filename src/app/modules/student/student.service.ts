import { startSession } from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({id})
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');
  return result;
};

const updateStudentIntoDB = async (id:string, payload:Partial<TStudent>) =>{

  const {name, guardian, localGuardian, ...remainingData} = payload

  const modifiedUpdatedData: Record<string, unknown> = {...remainingData}

  if (name && Object.keys(name).length){
    for(const [key,value] of Object.entries(name)){
      modifiedUpdatedData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length){
    for(const [key,value] of Object.entries(guardian)){
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length){
    for(const [key,value] of Object.entries(localGuardian)){
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }
  
  console.log(modifiedUpdatedData);
    const result = await StudentModel.findOneAndUpdate(
      { id },
      modifiedUpdatedData,
      { new: true, runValidators: true },
    )
      .populate('admissionSemester')
      .populate({path:'academicDepartment', populate:{path:'academicFaculty'}});
    return result
}

const deleteStudentFromDB = async (id: string) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }, //for update session need to be provided likewise
    );

    if(!deletedStudent){
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete student')
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete User');
    }

    await session.commitTransaction()
    await session.endSession()
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Student not deleted.")
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};

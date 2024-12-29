import mongoose, { startSession } from 'mongoose';
import config from '../../config';
import TAcademicSemester from '../academicSemester/academicSemester.interface';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';

import { UserModel } from './user.model';
import {
	generateAdminId,
	generateFacultyId,
	generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { TUser } from './user.interface';
import { Admin } from '../admin/admin.model';
import { Faculty } from '../faculty/faculty.model';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { TFaculty } from '../faculty/faculty.interface';
import { TAdmin } from '../admin/admin.interface';

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
		await session.endSession();

		return newStudent;
	} catch (error: any) {
		await session.abortTransaction();
		await session.endSession();
		throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error);
	}
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
	// create a user object
	const userData: Partial<TUser> = {};

	//if password is not given , use deafult password
	userData.password = password || (config.defaultPasswordForUser as string);

	//set student role
	userData.role = 'Teacher';

	// find academic department info
	const academicDepartment = await AcademicDepartmentModel.findById(
		payload.academicDepartment,
	);

	if (!academicDepartment) {
		throw new AppError(400, 'Academic department not found');
	}

	const session = await mongoose.startSession();

	try {
		session.startTransaction();
		//set  generated id
		userData.id = await generateFacultyId();

		// create a user (transaction-1)
		const newUser = await UserModel.create([userData], { session }); // array

		//create a faculty
		if (!newUser.length) {
			throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
		}
		// set id , _id as user
		payload.id = newUser[0].id;
		payload.user = newUser[0]._id; //reference _id

		// create a faculty (transaction-2)

		const newFaculty = await Faculty.create([payload], { session });

		if (!newFaculty.length) {
			throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create faculty');
		}

		await session.commitTransaction();
		await session.endSession();

		return newFaculty;
	} catch (err: any) {
		await session.abortTransaction();
		await session.endSession();
		throw new Error(err);
	}
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
	// create a user object
	const userData: Partial<TUser> = {};

	//if password is not given , use deafult password
	userData.password = password || (config.defaultPasswordForUser as string);

	//set student role
	userData.role = 'Admin';

	const session = await mongoose.startSession();

	try {
		session.startTransaction();
		//set  generated id
		userData.id = await generateAdminId();

		// create a user (transaction-1)
		const newUser = await UserModel.create([userData], { session });

		//create a admin
		if (!newUser.length) {
			throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
		}
		// set id , _id as user
		payload.id = newUser[0].id;
		payload.user = newUser[0]._id; //reference _id

		// create a admin (transaction-2)
		const newAdmin = await Admin.create([payload], { session });

		if (!newAdmin.length) {
			throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
		}

		await session.commitTransaction();
		await session.endSession();

		return newAdmin;
	} catch (err: any) {
		await session.abortTransaction();
		await session.endSession();
		throw new Error(err);
	}
};

export const UserService = {
	createStudentIntoDB,
	createFacultyIntoDB,
	createAdminIntoDB,
};

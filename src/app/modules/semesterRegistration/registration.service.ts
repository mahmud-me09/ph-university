import { SemesterRegistrationModel } from './registration.model';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './registration.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { registrationStatus } from './registration.constant';

const createSemesterRegistrationIntoDB = async (
	payload: TSemesterRegistration,
) => {
	const academicSemesterId = payload?.academicSemester;

	// check if there are any registered semester that is already UPCOMING or ONGOING
	const isAnyUpcomingOrOngoingSemesterExists: unknown =
		await SemesterRegistrationModel.findOne({
			$or: [
				{ status: registrationStatus.upcoming },
				{ status: registrationStatus.ongoing },
			],
		});
	if (!isAnyUpcomingOrOngoingSemesterExists) {
		throw new AppError(
			StatusCodes.BAD_REQUEST,
			`There is already an ${(isAnyUpcomingOrOngoingSemesterExists as TSemesterRegistration)?.status} registed semester !`,
		);
	}

	// checking if the id of semeser exists
	const isAcademicSemesterExists =
		await AcademicSemesterModel.findById(academicSemesterId);

	if (!isAcademicSemesterExists) {
		throw new AppError(
			StatusCodes.NOT_FOUND,
			'This Academic Semester is not found.',
		);
	}

	//   checking if the registration already exists
	const isSemesterRegistrationExists =
		await SemesterRegistrationModel.findOne({academicSemester:academicSemesterId});

	if (isSemesterRegistrationExists) {
		throw new AppError(StatusCodes.CONFLICT, 'This semester is already exists');
	}
	const result = await SemesterRegistrationModel.create(payload);

	return result;
};

const getAllSemesterRegistrationFromDB = async (
	query: Record<string, unknown>,
) => {
	const semesterRegistrationQuery = new QueryBuilder(
		SemesterRegistrationModel.find().populate('academicSemester'),
		query,
	)
		.filter()
		.sort()
		.paginate()
		.limitFields();

	const result = await semesterRegistrationQuery.modelQuery;
	return result;
};

const getASemesterRegistrationFromDB = async (id: string) => {
	const result = await SemesterRegistrationModel.findById(id);
	return result;
};

const updateSemesterRegistrationIntoDB = async (
	id: string,
	payload: Partial<TSemesterRegistration>,
) => {
	// if semester doesn't exists
	const isSemesterRegistrationExists =
		await SemesterRegistrationModel.findById(id);

	if (!isSemesterRegistrationExists) {
		throw new AppError(StatusCodes.NOT_FOUND, 'This semester is not found');
	}

	// if requested semester ended
	const currentSemesterStatus: string = isSemesterRegistrationExists?.status;
	const requestedStatus = payload.status;

	if (currentSemesterStatus === registrationStatus.ended) {
		throw new AppError(
			StatusCodes.BAD_REQUEST,
			`The semeseter has already ${currentSemesterStatus}`,
		);
	}
	// upcoming -> ongoing -> ended

	if (
		currentSemesterStatus === registrationStatus.upcoming &&
		requestedStatus === registrationStatus.ended
	) {
		throw new AppError(
			StatusCodes.BAD_REQUEST,
			`You cannot directly change status to ended`,
		);
	}
	if (
		currentSemesterStatus === registrationStatus.ongoing &&
		requestedStatus === registrationStatus.upcoming
	) {
		throw new AppError(
			StatusCodes.BAD_REQUEST,
			`You cannot change ongoing status to upcoming`,
		);
	}

	const result = await SemesterRegistrationModel.findByIdAndUpdate(
		id,
		payload,
		{ new: true, runValidators: true },
	);
	return result;
};

export const SemesterRegistrationService = {
	createSemesterRegistrationIntoDB,
	getAllSemesterRegistrationFromDB,
	getASemesterRegistrationFromDB,
	updateSemesterRegistrationIntoDB,
};

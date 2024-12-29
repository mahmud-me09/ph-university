import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { SemesterRegistrationService } from './registration.service';
import { AcademicSemesterServices } from '../academicSemester/academicSemester.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
	const result =
		await SemesterRegistrationService.createSemesterRegistrationIntoDB(
			req.body,
		);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: 'Semester Registration is created.',
		data: result,
	});
});

const getASemesterRegistration = catchAsync(async (req, res) => {});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
	const result =
		await SemesterRegistrationService.getAllSemesterRegistrationFromDB(
			req.query,
		);
	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: 'Semester Registration Retrieved Successfully.',
		data: result,
	});
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await SemesterRegistrationService;
});

export const SemesterRegistrationController = {
	createSemesterRegistration,
	getASemesterRegistration,
	getAllSemesterRegistration,
	updateSemesterRegistration,
};

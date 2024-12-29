import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { OfferedCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
	const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: `Offered course has been created successfully.`,
		data: result,
	});
});
const getAllOfferedCourses = catchAsync(async (req, res) => {
	const result = await OfferedCourseService.getAllOfferedCourseFromDB(
		req.query,
	);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: `Offered courses have been retrieved successfully.`,
		data: result,
	});
});

const getAOfferedCourse = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await OfferedCourseService.getAOfferedCourseFromDB(id);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: `Offered course has been retrieved successfully.`,
		data: result,
	});
});
const updateOfferedCourse = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await OfferedCourseService.updateOfferedCourseIntoDB(
		id,
		req.body,
	);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: `Offered course has been retrieved successfully.`,
		data: result,
	});
});

export const OfferedCourseController = {
	createOfferedCourse,
	getAllOfferedCourses,
	getAOfferedCourse,
	updateOfferedCourse,
};

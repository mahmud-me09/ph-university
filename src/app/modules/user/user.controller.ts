import { UserService } from './user.service';
import { UserValidation } from './user.validator';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: newStudent } = req.body;
  // const zodParsedData = UserValidation.userValidationSchema.parse(newStudent);
  const result = await UserService.createStudentIntoDB(password, newStudent);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student Account Created Successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
	const { password, faculty: facultyData } = req.body;

	const result = await UserService.createFacultyIntoDB(password, facultyData);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: 'Faculty is created succesfully',
		data: result,
	});
});

const createAdmin = catchAsync(async (req, res) => {
	const { password, admin: adminData } = req.body;

	const result = await UserService.createAdminIntoDB(password, adminData);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: 'Admin is created succesfully',
		data: result,
	});
});





export const UserController = {
  createStudent,
  createAdmin,
  createFaculty
};

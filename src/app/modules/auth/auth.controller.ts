import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
	const result = await AuthServices.loginUser(req.body);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: `User Logged in successfully.`,
		data: result,
	});
});

const changePassword = catchAsync(async (req, res) => {
	
	const {...passwordData} = req.body
	const result = await AuthServices.changePassword(req.user, passwordData);
	console.log(result)
	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: `User Password changed successfully.`,
		data: result,
	});
});

export const AuthController = {
	loginUser,
	changePassword,
};

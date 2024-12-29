import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser, TPasswordChage } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
	// checking user exists or not
	const isUserExists = await UserModel.isUserExistsByCustomId(payload.id);
	if (!isUserExists) {
		throw new AppError(StatusCodes.NOT_FOUND, `This user is not found !`);
	}

	// checking if the user is already deleted
	const isDeleted = isUserExists?.isDeleted;
	if (isDeleted) {
		throw new AppError(StatusCodes.FORBIDDEN, `User already deleted`);
	}

	// checking if the user is already blocked
	const status = isUserExists?.status;
	if (status === 'blocked') {
		throw new AppError(
			StatusCodes.FORBIDDEN,
			`User is blocked contact with admin.`,
		);
	}

	// checking if the password is correct
	const isPasswordMatched = await UserModel.isPasswordMatched(
		payload.password,
		isUserExists.password,
	);

	if (!isPasswordMatched) {
		throw new AppError(
			StatusCodes.NOT_FOUND,
			`User authentication is not valid.`,
		);
	}
	const jwtPayload = {
		id: isUserExists.id,
		role: isUserExists.role,
	};
	const accessToken = jwt.sign(
		{
			data: jwtPayload,
		},
		config.jwtSecret as string,
		{
			expiresIn: '7d',
		},
	);
	return {
		accessToken,
		needsPasswordChange: isUserExists?.needsPasswordReset,
	};
};

const changePassword = async (user: JwtPayload, payload: TPasswordChage) => {
	const isUserExists = await UserModel.isUserExistsByCustomId(user.id);
	if (!isUserExists) {
		throw new AppError(StatusCodes.NOT_FOUND, `This user is not found !`);
	}

	// checking if the user is already deleted
	const isDeleted = isUserExists?.isDeleted;
	if (isDeleted) {
		throw new AppError(StatusCodes.FORBIDDEN, `User already deleted`);
	}

	// checking if the user is already blocked
	const status = isUserExists?.status;
	if (status === 'blocked') {
		throw new AppError(
			StatusCodes.FORBIDDEN,
			`User is blocked contact with admin.`,
		);
	}

	// checking if the password is correct
	const isPasswordMatched = await UserModel.isPasswordMatched(
		payload.oldPassword,
		isUserExists.password,
	);

	if (!isPasswordMatched) {
		throw new AppError(
			StatusCodes.NOT_FOUND,
			`User authentication is not valid.`,
		);
	}
	const newHashedPassword = await bcrypt.hash(
		payload.password,
		Number(config.bycryptSalt),
	);
	const result = await UserModel.findOneAndUpdate(
		{
			id: user.id,
			role: user.role,
		},
		{
			password: newHashedPassword,
			needsPasswordReset:false
		},
	);
};

export const AuthServices = {
	loginUser,
	changePassword,
};

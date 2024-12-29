import jwt, { JwtPayload } from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { TUserRoles } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRoles[]) => {
	return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const token = req.headers.authorization;
		if (!token) {
			throw new AppError(
				StatusCodes.UNAUTHORIZED,
				'You are not authorized to log in',
			);
		}
		jwt.verify(token, config.jwtSecret as string, function (error, decoded) {
			if (error) {
				throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
			}
			const role = (decoded as JwtPayload)?.data?.role;

			if (requiredRoles && !requiredRoles.includes(role)) {
				throw new AppError(
					StatusCodes.UNAUTHORIZED,
					'You are not authorized user',
				);
			}
			req.user = (decoded as JwtPayload)?.data;
			next();
		});
	});
};

export default auth;

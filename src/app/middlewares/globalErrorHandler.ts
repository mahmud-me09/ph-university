import { NextFunction, Request, Response } from 'express';
import config from '../config';

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction,
): undefined => {
  const statusCode = err.statusCode || 500;
  const isProduction = config.nodeEnvironment === 'production';

  res.status(statusCode).json({
    statusCode,
    success: false,
    message: err.message || 'Something went wrong',
    error: isProduction ? undefined : err, // Avoid exposing sensitive data in production
    stack: isProduction ? undefined : err.stack, // Include stack trace only in development
  });
  next()
};

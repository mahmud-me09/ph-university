import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFound : RequestHandler = (_req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'API not found !!!',
    error: '',
  });
  next()
};

export default notFound;

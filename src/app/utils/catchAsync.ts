import { NextFunction, Request, RequestHandler, Response } from "express";

// Higher order function instead of try catch block
export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

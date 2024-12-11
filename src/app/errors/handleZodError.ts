

import { StatusCodes } from "http-status-codes";
import { ZodError, ZodIssue } from "zod";
import { TGenericErrorResponse } from "../interface/error";

export const handleZodError = (err: ZodError):TGenericErrorResponse => {
  const errorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = StatusCodes.BAD_REQUEST

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

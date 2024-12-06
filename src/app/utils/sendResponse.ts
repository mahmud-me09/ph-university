import { Response } from 'express';

export const sendResponse = <T>(
  res: Response,
  data: {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
  },
) => {
  return res.status(data?.statusCode).json({
    message: data.message,
    success: data.success,
    data: data.data,
  });
};

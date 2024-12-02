import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';

const router = express.Router();

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const zodParsedData = await schema.parseAsync({
        body: req.body,
      });
    } catch (error) {
      next(error);
    }
  };
};

router.post('/create-student', UserController.createStudent);
// router.post('/create-faculty', UserController.createFaculty);
// router.post('/create-admin', UserController.createAdmin);

export const UserRoutes = router;

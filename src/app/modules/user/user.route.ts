import { StudentValidation } from './../student/student.validator';
import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidation.CreateStudentValidationSchema),
  UserController.createStudent,
);
// router.post('/create-faculty', UserController.createFaculty);
// router.post('/create-admin', UserController.createAdmin);

export const UserRoutes = router;

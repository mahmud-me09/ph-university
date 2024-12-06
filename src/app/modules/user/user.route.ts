import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import studentValidationSchema from '../student/student.validator';




const router = express.Router();



router.post(
  '/create-student',
  validateRequest(studentValidationSchema),
  UserController.createStudent,
);
// router.post('/create-faculty', UserController.createFaculty);
// router.post('/create-admin', UserController.createAdmin);

export const UserRoutes = router;

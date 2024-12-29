import { Admin } from './../admin/admin.model';
import { StudentValidation } from './../student/student.validator';
import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';

const router = express.Router();

router.post(
	'/create-student',
	auth(USER_ROLE.Admin),
	validateRequest(StudentValidation.CreateStudentValidationSchema),
	UserController.createStudent,
);

router.post(
	'/create-faculty',
	auth(USER_ROLE.Faculty),
	validateRequest(createFacultyValidationSchema),
	UserController.createFaculty,
);

router.post(
	'/create-admin',
	auth(USER_ROLE.Admin),
	validateRequest(createAdminValidationSchema),
	UserController.createAdmin,
);

export const UserRoutes = router;



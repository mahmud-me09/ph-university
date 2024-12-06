import {Router} from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import studentValidationSchema from './student.validator';

const router = Router();

router.get('/', StudentControllers.getAllStudents);

router.get(
  '/:studentId',
  validateRequest(studentValidationSchema),
  StudentControllers.getSingleStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);


export const StudentRoutes = router;
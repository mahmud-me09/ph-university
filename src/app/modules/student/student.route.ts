import { Router } from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validator';

const router = Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:id', StudentControllers.getSingleStudent);

router.patch('/:id', validateRequest(StudentValidation.UpdateStudentValidationSchema), StudentControllers.updateStudent);

router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;

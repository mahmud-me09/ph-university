import { Router } from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';


const router = Router()

router.post('/create-academic-semester', validateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema), AcademicSemesterController.createAcademicSemester)

router.get('/get-academic-semesters', AcademicSemesterController.getAllAcademicSemester)

router.get('/get-academic-semester/:id', AcademicSemesterController.getAAcademicSemester)

router.patch(
  '/update-academic-semester/:id',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.UpdateAcademicSemester,
);

export const AcademicSemesterRoutes = router
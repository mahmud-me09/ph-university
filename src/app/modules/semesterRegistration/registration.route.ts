import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './registration.validation';
import { SemesterRegistrationController } from './registration.controller';

const router = Router();

router.post(
	'/create-semester-registration',
	validateRequest(
		SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
	),
	SemesterRegistrationController.createSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistration);

router.get('/:id', SemesterRegistrationController.getASemesterRegistration);

router.patch(
	'/:id',
	validateRequest(
		SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
	),
	SemesterRegistrationController.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;

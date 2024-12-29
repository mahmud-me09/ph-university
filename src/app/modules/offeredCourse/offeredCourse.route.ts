import { Router } from 'express';
import { OfferedCourseController } from './offeredCourse.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';

const router = Router();

router.post(
	'/create-offered-course',
	validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
	OfferedCourseController.createOfferedCourse,
);
router.get(
	'/get-offered-courses',
	OfferedCourseController.getAllOfferedCourses,
);

router.get(
	'/get-offered-course/:id',
	OfferedCourseController.getAOfferedCourse,
);

router.patch(
	'/update-offered-course/:id',
	validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
	OfferedCourseController.updateOfferedCourse,
);

export const OfferedCourseRoute = router;

import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentController } from "./academicDepartment.controller";

const router = Router();

router.post(
  '/create-academic-department',
  // validateRequest(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentController.createAcademicDepartment,
);

router.get(
  '/get-academic-departments',
  AcademicDepartmentController.getAllAcademicDepartment,
);

router.get(
  '/get-academic-department/:id',
  AcademicDepartmentController.getAAcademicDepartment,
);

router.patch(
  '/update-academic-department/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);

export const AcademicDepartmentRoute = router;

import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyController } from "./academicFaculty.controller";


const router = Router()

router.post('/create-academic-faculty',validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema), AcademicFacultyController.createAcademicFaculty)

router.get("/get-academic-faculties", AcademicFacultyController.getAllAcademicFaculty)

router.get('/get-academic-faculty/:id',AcademicFacultyController.getAAcademicFaculty)

router.patch("/update-academic-faculty/:id",validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema), AcademicFacultyController.updateAcademicFaculty)

export const AcademicFacultyRoute = router
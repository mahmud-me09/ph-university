import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = Router()

router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthController.loginUser)

router.post('/change-password',
auth(USER_ROLE.Admin, USER_ROLE.Student, USER_ROLE.Faculty), validateRequest(AuthValidation.changePasswordValidationSchema), AuthController.changePassword)

export const AuthRoutes = router
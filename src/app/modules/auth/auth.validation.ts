import { z } from "zod";

const loginValidationSchema = z.object({
    body:z.object({
        id:z.string({required_error:"ID is required"}),
        password:z.string({required_error:"Enter your password."})
    })
})
const changePasswordValidationSchema = z.object({
    body:z.object({
        oldPassword:z.string({
            required_error:"Old password required"
        }),
        password:z.string({required_error:"Enter your password."})
    })
})

export const AuthValidation = {
	loginValidationSchema,
	changePasswordValidationSchema,
};
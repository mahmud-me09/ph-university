import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name must be string',
      required_error: 'academic department is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty ref id must be string',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name must be string',
      required_error: 'academic department is required',
    }).optional(),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty ref id must be string',
    }).optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};

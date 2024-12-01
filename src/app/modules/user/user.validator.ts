import { z } from 'zod';

const userValidationSchema = z.object({
  //   id: z.string(), //as id will automatically generated we will not provide this.
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password cannot be more than 20 character' })
    .optional(),
  //   needsPasswordChange: z.boolean().optional().default(true),
  //   role: z.enum(['Student', 'Admin', 'Faculty']), //will be set with api endpoint
  //   status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  //   isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = {
  userValidationSchema,
};

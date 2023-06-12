import { z } from 'zod';

const createZodSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.string({
        required_error: 'role is Required',
      }),
      password: z.string().optional(),
    }),
  }),
});

/* await createZodSchema.parseAsync(req) */

export const UserValidation = {
  createZodSchema,
};

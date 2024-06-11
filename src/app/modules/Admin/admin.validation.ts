import { z } from 'zod';

const createAdminValidation = z.object({
  body: z.object({
      password: z.string({invalid_type_error: 'Password must be string'}).max(20),
      admin: z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string(),
        address: z.string(),
      })
    })
  });
  
export const UserValidation={
    createAdminValidation,
};

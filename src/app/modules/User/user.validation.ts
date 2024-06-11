import { z } from 'zod';

const createUserValidation = z.object({
    // name: z.string(),
    // email: z.string().email(),
    // role: z.enum(['user', 'admin']),
    password: z.string({invalid_type_error: 'Password must be string'}).max(20).optional(), 
    // phone: z.string(),
    // address: z.string(),
  });
  
export const UserValidation={
  createUserValidation,
};

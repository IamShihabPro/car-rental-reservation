import { z } from 'zod';

const userValidationSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['user', 'admin']),
    password: z.string({invalid_type_error: 'Password must be string'}).max(20), 
    phone: z.string(),
    address: z.string(),
  });
  
export default userValidationSchema;

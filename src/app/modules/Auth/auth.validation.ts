// validations/auth.validation.ts
import { z } from 'zod';

const signupValidation = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    email: z.string().email('Invalid email address'),
    role: z.enum(['user', 'admin']),
    password: z.string().max(20, 'Password is required'),
    phone: z.string().nonempty('Phone number is required'),
    address: z.string().nonempty('Address is required'),
  }),
});

export const authValidations = {
  signupValidation,
};

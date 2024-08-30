import { z } from 'zod';

const createUserValidation = z.object({
 body: z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email address'),
  image: z.string().nonempty('Image is required'),
  role: z.enum(['user', 'admin']),
  password: z.string().max(20, 'Password not more than 20 characters'),
  phone: z.string().nonempty('Phone number is required'),
  address: z.string().nonempty('Address is required'),
 })
  });
  
export const UserValidation={
  createUserValidation,
};

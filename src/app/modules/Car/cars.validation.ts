// car.validation.ts
import { z } from 'zod';

const createCarsValidation = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    color: z.string(),
    isElectric: z.boolean(),
    features: z.array(z.string()),
    pricePerHour: z.number().positive(),
  })
});

const updateCarsValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    status: z.enum(['available', 'unavailable', 'maintenance']).optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z.number().positive().optional(),
    isDeleted: z.boolean().optional()
  })
});

export const CarsValidations = {
    createCarsValidation,
    updateCarsValidation
}

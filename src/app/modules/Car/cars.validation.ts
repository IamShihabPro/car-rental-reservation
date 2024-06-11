// car.validation.ts
import { z } from 'zod';

export const createCarsValidation = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    color: z.string(),
    isElectric: z.boolean(),
    status: z.enum(['available', 'unavailable', 'maintenance']),
    features: z.array(z.string()),
    pricePerHour: z.number().positive(),
    isDeleted: z.boolean()
  })
});

export const CarsValidations = {
    createCarsValidation
}

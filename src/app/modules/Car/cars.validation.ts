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
    status: z.enum(['available', 'unavailable']).optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z.number().positive().optional(),
    isDeleted: z.boolean().optional()
  })
});

const returnCarValidation = z.object({
  body: z.object({
    bookingId: z.string(),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be in 24hr format (e.g., '15:00')"),
  }),
});

export const CarsValidations = {
    createCarsValidation,
    updateCarsValidation,
    returnCarValidation
}
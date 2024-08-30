// car.validation.ts
import { z } from 'zod';

const createCarsValidation = z.object({
  body: z.object({
    brand: z.string(),
    name: z.string(),
    description: z.string(),
    color: z.string(),
    image: z.string(),
    isElectric: z.boolean(),
    features: z.array(z.string()),
    status: z.enum(['available', 'unavailable']).optional(),
    pricePerHour: z.number().positive(),
    gps: z.boolean().optional(),
    childSeat: z.boolean().optional(),
  })
});

const updateCarsValidation = z.object({
  body: z.object({
    brand: z.string(),
    name: z.string(),
    description: z.string(),
    color: z.string(),
    image: z.string(),
    isElectric: z.boolean().optional(),
    features: z.array(z.string()),
    status: z.enum(['available', 'unavailable']).optional(),
    pricePerHour: z.number().positive(),
    gps: z.boolean().optional(),
    childSeat: z.boolean().optional(),
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
import { z } from 'zod';

const createBookingValidation = z.object({
  body: z.object({
    date: z.preprocess((arg) => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date()),
    userId: z.string(),
    carId: z.string(),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be in 24hr format (e.g., '14:00')"),
    endTime: z.union([z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be in 24hr format (e.g., '16:00')"), z.null()]).optional(),
  }),
});

export const bookingValidations = {
  createBookingValidation,
};

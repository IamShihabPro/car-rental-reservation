import { z } from 'zod';

const createBookingValidation = z.object({
  body: z.object({
    date: z.preprocess((arg) => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date()),
    user: z.string(),
    car: z.string(),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be in 24hr format (e.g., '14:00')"),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be in 24hr format (e.g., '16:00')"),
  }),
});

export const bookingValidations = {
  createBookingValidation,
};

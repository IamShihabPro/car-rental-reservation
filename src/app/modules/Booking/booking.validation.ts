import { z } from 'zod';

const createBookingValidation = z.object({
  body: z.object({
    carId: z.string(),
    date: z.preprocess((arg) => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date()),
    // user: z.string(),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be in 24hr format (e.g., '14:00')"),
    endTime: z.union([z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be in 24hr format (e.g., '16:00')"), z.null()]).optional(),
    idType: z.string(),
    idNumber: z.string(),
    drivingLicense: z.string(),
  }),
});

const updateBookingValidation = z.object({
  body: z.object({
    carId: z.string().optional(),
    date: z.preprocess((arg) => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date()).optional(),
    // user: z.string(),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be in 24hr format (e.g., '14:00')").optional(),
    endTime: z.union([z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be in 24hr format (e.g., '16:00')"), z.null()]).optional(),
    idType: z.string().optional(),
    idNumber: z.string().optional(),
    drivingLicense: z.string().optional(),
  }),
});

export const bookingValidations = {
  createBookingValidation,
  updateBookingValidation
};

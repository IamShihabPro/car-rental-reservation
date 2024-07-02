"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidations = void 0;
const zod_1 = require("zod");
const createBookingValidation = zod_1.z.object({
    body: zod_1.z.object({
        carId: zod_1.z.string(),
        date: zod_1.z.preprocess((arg) => {
            if (typeof arg === 'string' || arg instanceof Date)
                return new Date(arg);
        }, zod_1.z.date()),
        // user: z.string(),
        startTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be in 24hr format (e.g., '14:00')"),
        endTime: zod_1.z.union([zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be in 24hr format (e.g., '16:00')"), zod_1.z.null()]).optional(),
    }),
});
exports.bookingValidations = {
    createBookingValidation,
};

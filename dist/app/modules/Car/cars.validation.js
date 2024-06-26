"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsValidations = void 0;
// car.validation.ts
const zod_1 = require("zod");
const createCarsValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        color: zod_1.z.string(),
        isElectric: zod_1.z.boolean(),
        features: zod_1.z.array(zod_1.z.string()),
        pricePerHour: zod_1.z.number().positive(),
    })
});
const updateCarsValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        color: zod_1.z.string().optional(),
        isElectric: zod_1.z.boolean().optional(),
        status: zod_1.z.enum(['available', 'unavailable']).optional(),
        features: zod_1.z.array(zod_1.z.string()).optional(),
        pricePerHour: zod_1.z.number().positive().optional(),
        isDeleted: zod_1.z.boolean().optional()
    })
});
const returnCarValidation = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string(),
        endTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be in 24hr format (e.g., '15:00')"),
    }),
});
exports.CarsValidations = {
    createCarsValidation,
    updateCarsValidation,
    returnCarValidation
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        role: zod_1.z.enum(['user', 'admin']),
        password: zod_1.z.string({ invalid_type_error: 'Password must be string' }).max(20),
        phone: zod_1.z.string(),
        address: zod_1.z.string(),
    })
});
exports.UserValidation = {
    createUserValidation,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty('Name is required'),
        email: zod_1.z.string().email('Invalid email address'),
        role: zod_1.z.enum(['user', 'admin']),
        password: zod_1.z.string().max(20, 'Password not more than 20 characters'),
        phone: zod_1.z.string().nonempty('Phone number is required'),
        address: zod_1.z.string().nonempty('Address is required'),
    })
});
exports.UserValidation = {
    createUserValidation,
};

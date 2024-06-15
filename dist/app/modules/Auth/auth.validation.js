"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSignInValidations = void 0;
// validations/auth.validation.ts
const zod_1 = require("zod");
const signinValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().max(20, 'Password is required'),
    }),
});
exports.authSignInValidations = {
    signinValidation,
};

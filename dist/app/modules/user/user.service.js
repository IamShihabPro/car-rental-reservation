"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const signUpUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.findOne({ email: payload.email });
    if (existingUser) {
        throw new Error('Email already exists');
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getAllUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const CarSearchableFields = ['name'];
    const carsQuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(CarSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield carsQuery.modelQuery;
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const signInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.findOne({ email: payload.email }).select('+password');
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found");
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(payload.password, isUserExists.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Incorrect password");
    }
    const jwtPayload = {
        email: isUserExists.email,
        role: isUserExists.role,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, {
        expiresIn: config_1.default.jwt_refresh_expires_in,
    });
    const result = yield user_model_1.User.findById(isUserExists._id).select('-password');
    return { result, token, refreshToken };
});
exports.UserServices = {
    signUpUserIntoDB,
    getAllUsersFromDB,
    getSingleUser,
    signInUser,
};

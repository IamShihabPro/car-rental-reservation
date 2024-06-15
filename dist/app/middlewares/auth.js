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
exports.auth = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const catchAsync_1 = __importDefault(require("../modules/Utils/catchAsync"));
const user_model_1 = require("../modules/User/user.model");
const http_status_1 = __importDefault(require("http-status"));
const sliptToken = (authHeader) => {
    if (!authHeader) {
        return null;
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer === 'Bearer' && token) {
        return token;
    }
    return authHeader;
};
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // const accessToken = req.headers.authorization;
        const authHeader = req.headers.authorization;
        const accessToken = sliptToken(authHeader);
        if (!accessToken) {
            throw new AppError_1.default(401, "You are not authorized to access this route");
        }
        const verfiedToken = jsonwebtoken_1.default.verify(accessToken, config_1.default.jwt_access_secret);
        const { role, email } = verfiedToken;
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This is user is not found");
        }
        if (!requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
        }
        req.user = verfiedToken;
        next();
    }));
};
exports.auth = auth;

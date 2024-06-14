import httpStatus from "http-status";
import { User } from "../User/user.model";
import { TSignin } from "./auth.interface";
import AppError from "../../errors/AppError";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import config from "../../config";

const signInUser = async (payload: TSignin) => {
    const isUserExists = await User.findOne({ email: payload.email }).select('+password');
    
    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
    }

    const isPasswordMatch = await bcrypt.compare(payload.password, isUserExists.password);
    
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }

    const jwtPayload = {
        email: isUserExists.email,
        role: isUserExists.role,
    };

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
        expiresIn: config.jwt_access_expires_in,
        });

    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string,
            {
              expiresIn: config.jwt_refresh_expires_in,
            }
    );

    const result = await User.findById(isUserExists._id).select('-password');

    return {result, accessToken, refreshToken};
}

export const AuthServices = {
    signInUser
};

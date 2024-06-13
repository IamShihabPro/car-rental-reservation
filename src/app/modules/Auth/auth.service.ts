import httpStatus from "http-status";
import { User } from "../User/user.model";
import { TSignin } from "./auth.interface";
import AppError from "../../errors/AppError";
import bcrypt from 'bcryptjs';

const signInUser = async (payload: TSignin) => {
    const isUserExists = await User.findOne({ email: payload.email }).select('+password');
    
    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
    }

    const isPasswordMatch = await bcrypt.compare(payload.password, isUserExists.password);
    
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }

    return {
        success: true,
        statusCode: httpStatus.OK,
       
    };
}

export const AuthServices = {
    signInUser
};

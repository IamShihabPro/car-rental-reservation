import httpStatus from "http-status";
import catchAsync from "../Utils/catchAsync";
import sendResponse from "../Utils/sendResponse";
import { AuthServices } from "./auth.service";

const signIn = catchAsync(async(req, res)=>{
    const result = await AuthServices.signInUser(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is login successfully',
        data: result
    })
})

export const AuthController = {
    signIn
}
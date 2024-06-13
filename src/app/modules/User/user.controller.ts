import httpStatus from "http-status";
import catchAsync from "../Utils/catchAsync";
import sendResponse from "../Utils/sendResponse";
import { UserServices } from "./user.service";

const signUpUser = catchAsync(async (req, res) => {
  const result = await UserServices.signUpUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User sign up succesfully',
    data: result,
  });
});


export const UserControllers = {
  signUpUser
}

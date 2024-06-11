import httpStatus from "http-status";
import catchAsync from "../Utils/catchAsync";
import sendResponse from "../Utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async(req, res)=>{
    const result = await UserServices.createUserIntoDB(req.body)
    
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created succesfully',
    data: result,
  });
})
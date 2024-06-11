import httpStatus from "http-status";
import catchAsync from "../Utils/catchAsync";
import sendResponse from "../Utils/sendResponse";
import { CarsServices } from "./cars.service";

const createCars = catchAsync(async(req, res)=>{
    const result = await CarsServices.createCarsIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car is created succesfully',
        data: result,
      });
})

export const CarsController = {
    createCars,
}
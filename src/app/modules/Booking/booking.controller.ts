import httpStatus from "http-status";
import catchAsync from "../Utils/catchAsync";
import sendResponse from "../Utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async(req, res)=>{
    const result = await BookingServices.createBookingIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Your booking is created succesfully',
        data: result,
      });
})

export const BookingControllers = {
    createBooking,
}
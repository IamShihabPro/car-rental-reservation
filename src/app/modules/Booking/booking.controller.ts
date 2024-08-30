import httpStatus from "http-status";
import catchAsync from "../Utils/catchAsync";
import sendResponse from "../Utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async(req, res)=>{
    const result = await BookingServices.createBookingIntoDB(req.body, req.user)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Your booking is created succesfully',
        data: result,
      });
})

const getAllBookings = catchAsync(async(req, res)=>{
    const result =  await BookingServices.getAllBookingsFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking are retrived succesfully',
        data: result,
      });
})

// const getSingleBookings = catchAsync(async(req, res)=>{
//     const {mybookings} = req.params
//     const result =  await BookingServices.getASingleBookingsFromDB(mybookings)
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Booking are retrived succesfully',
//         data: result,
//       });
// })


const getMyBookings = catchAsync(async (req, res) => {
    const { email } = req.user as { email: string };
    const bookings = await BookingServices.getMyBookingsFromDB(email);
  
    if (!bookings || bookings.length === 0) {
      return   sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: true,
        message: 'No Booking Found',
        data: bookings,
      });
    }
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Your Bookings are retrieved successfully',
      data: bookings,
    });
  });


const updateBooking = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await BookingServices.updateBookingIntoDB(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking is updated succesfully',
        data: result,
      });
})

const cancelBooking = catchAsync(async(req, res) => {
  const {id} = req.params
  const result = await BookingServices.cancelBookingIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is canceled successfully',
    data: result,
  });
});


const deleteBooking = catchAsync(async(req, res) => {
  const { id } = req.params;  
  const result = await BookingServices.deleteBookingIntoDB(id); 
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is deleted successfully',
    data: result,
  });
});


export const BookingControllers = {
    createBooking,
    getAllBookings,
    // getSingleBookings,
    getMyBookings,
    updateBooking,
    cancelBooking,
    deleteBooking
}
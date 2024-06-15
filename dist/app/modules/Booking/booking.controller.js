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
exports.BookingControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../Utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../Utils/sendResponse"));
const booking_service_1 = require("./booking.service");
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingServices.createBookingIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Your booking is created succesfully',
        data: result,
    });
}));
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingServices.getAllBookingsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Booking are retrived succesfully',
        data: result,
    });
}));
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
const getMyBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    console.log('User email:', email);
    const bookings = yield booking_service_1.BookingServices.getMyBookingsFromDB(email);
    if (!bookings || bookings.length === 0) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: true,
            message: 'No Booking Found',
            data: bookings,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Your Bookings are retrieved successfully',
        data: bookings,
    });
}));
exports.BookingControllers = {
    createBooking,
    getAllBookings,
    // getSingleBookings,
    getMyBookings
};

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
exports.BookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const cars_model_1 = __importDefault(require("../Car/cars.model"));
const user_model_1 = require("../User/user.model");
const booking_model_1 = __importDefault(require("./booking.model"));
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId } = payload;
    // Check if the car is available
    const car = yield cars_model_1.default.findOne({ _id: carId, status: 'available' });
    if (!car) {
        throw new Error('Car is not available for booking');
    }
    const result = yield booking_model_1.default.create(payload);
    yield cars_model_1.default.updateOne({ _id: carId }, { status: 'unavailable' });
    return result;
});
const getAllBookingsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const BookingSearchableFields = ['carId', 'date'];
    const bookingQuery = new QueryBuilder_1.default(booking_model_1.default.find().populate('userId').populate('carId'), query).search(BookingSearchableFields).filter().sort().paginate().fields();
    const result = yield bookingQuery.modelQuery;
    return result;
});
// const getASingleBookingsFromDB =  async(id: string) =>{
//     const result = await Booking.findById(id)
//     return result
// }
const getMyBookingsFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find({ email });
        if (!users || users.length === 0) {
            console.error('User not found');
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
        const user = users[0];
        const userId = user._id;
        const bookings = yield booking_model_1.default.find({ userId })
            .populate('userId')
            .populate('carId');
        if (!bookings || bookings.length === 0) {
            console.error('No bookings found');
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No bookings found');
        }
        return bookings;
    }
    catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    // getASingleBookingsFromDB,
    getMyBookingsFromDB
};

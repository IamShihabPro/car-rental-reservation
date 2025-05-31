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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const cars_model_1 = __importDefault(require("../car/cars.model"));
const user_model_1 = require("../user/user.model");
const booking_model_1 = __importDefault(require("./booking.model"));
const mongoose_1 = require("mongoose");
const createBookingIntoDB = (payload, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield user_model_1.User.findOne({ email: userData.email });
    // const transactionId = `TXN-${Date.now()}`;
    if (!userInfo) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, " User not found!!");
    }
    payload.user = userInfo._id;
    // payload.transactionId = transactionId;
    const { carId } = payload, restPayload = __rest(payload, ["carId"]);
    if (carId) {
        // Convert carId to ObjectId
        const carObjectId = new mongoose_1.Types.ObjectId(carId);
        // Check if the car is available
        const car = yield cars_model_1.default.findOne({ _id: carObjectId, status: 'available' });
        if (!car) {
            throw new Error('Car is not available for booking');
        }
        restPayload.car = carObjectId;
        // Create booking
        const createdBooking = yield booking_model_1.default.create(restPayload);
        const populatedBooking = yield booking_model_1.default.populate(createdBooking, { path: 'user', select: '-password -createdAt -updatedAt -isDeleted' });
        const result = yield booking_model_1.default.populate(populatedBooking, { path: 'car' });
        yield cars_model_1.default.updateOne({ _id: carObjectId }, { status: 'unavailable' });
        return result;
    }
    else {
        throw new Error('carId is required');
    }
});
const getAllBookingsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const BookingSearchableFields = ['car', 'date'];
    if (query.carId) {
        query.car = query.carId;
        delete query.carId;
    }
    const bookingQuery = new QueryBuilder_1.default(booking_model_1.default.find().populate({
        path: 'user',
        select: '-password -isDeleted -createdAt -updatedAt'
    }).populate('car'), query).search(BookingSearchableFields).filter().sort().paginate().fields();
    const result = yield bookingQuery.modelQuery;
    return result;
});
const getSingleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findById(id);
    return result;
});
const getMyBookingsFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield user_model_1.User.find({ email });
        if (!userData || userData.length === 0) {
            console.error('User not found');
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
        const users = userData[0];
        const user = users._id;
        const bookings = yield booking_model_1.default.find({ user })
            .populate({
            path: 'user',
            select: '-password -isDeleted -createdAt -updatedAt'
        })
            .populate('car');
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
const updateBookingIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
//   const result = await Car.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
const cancelBookingIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the booking by ID and ensure it belongs to the user
    const booking = yield booking_model_1.default.findByIdAndUpdate(id, { isCancel: true }, { new: true });
    if (!booking) {
        throw new Error("Booking not found or you are not authorized to cancel this booking");
    }
    // Update the car status to 'available' if the booking is successfully cancelled
    const car = yield cars_model_1.default.findByIdAndUpdate(booking.car, { status: "available" }, { new: true });
    if (!car) {
        throw new Error("Car not found");
    }
    return booking;
});
const deleteBookingIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.default.findByIdAndUpdate(id, { isDelete: true }, { new: true });
    if (!booking) {
        throw new Error("Booking not found or you are not authorized to cancel this booking");
    }
    // Update the car status to 'available' if the booking is successfully cancelled
    const car = yield cars_model_1.default.findByIdAndUpdate(booking.car, { status: "available" }, { new: true });
    if (!car) {
        throw new Error("Car not found");
    }
});
exports.default = deleteBookingIntoDB;
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getMyBookingsFromDB,
    updateBookingIntoDB,
    cancelBookingIntoDB,
    deleteBookingIntoDB,
    getSingleBooking,
};

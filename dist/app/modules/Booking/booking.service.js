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
const cars_model_1 = __importDefault(require("../Car/cars.model"));
const user_model_1 = require("../User/user.model");
const booking_model_1 = __importDefault(require("./booking.model"));
const mongoose_1 = require("mongoose");
const createBookingIntoDB = (payload, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield user_model_1.User.findOne({ email: userData.email });
    if (!userInfo) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, " User not found!!");
    }
    payload.user = userInfo._id;
    const { carId } = payload, restPayload = __rest(payload, ["carId"]);
    if (carId) {
        // Convert carId to ObjectId
        const carObjectId = new mongoose_1.Types.ObjectId(carId);
        // Check if the car is available
        const car = yield cars_model_1.default.findOne({ _id: carObjectId, status: 'available' });
        if (!car) {
            throw new Error('Car is not available for booking');
        }
        // Assign carObjectId to car in the payload
        restPayload.car = carObjectId;
        // Create booking
        const createdBooking = yield booking_model_1.default.create(restPayload);
        const populatedBooking = yield booking_model_1.default.populate(createdBooking, { path: 'user' });
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
    const bookingQuery = new QueryBuilder_1.default(booking_model_1.default.find().populate('user').populate('car'), query).search(BookingSearchableFields).filter().sort().paginate().fields();
    const result = yield bookingQuery.modelQuery;
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
            .populate('user')
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
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getMyBookingsFromDB
};

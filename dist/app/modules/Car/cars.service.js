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
exports.CarsServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const booking_model_1 = __importDefault(require("../Booking/booking.model"));
const cars_model_1 = __importDefault(require("./cars.model"));
const cars_utils_1 = require("./cars.utils");
const createCarsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cars_model_1.default.create(payload);
    return result;
});
const getAllCarsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const CarSearchableFields = ['name'];
    const carsQuery = new QueryBuilder_1.default(cars_model_1.default.find(), query)
        .search(CarSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield carsQuery.modelQuery;
    return result;
});
const getSingleCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cars_model_1.default.findById(id);
    return result;
});
const updateCarIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cars_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteCarIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cars_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const returnCarService = (bookingId, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.default.findById(bookingId).populate('car').populate('user');
    if (!booking) {
        throw new Error('Booking not found');
    }
    const car = yield cars_model_1.default.findByIdAndUpdate(booking.car, { status: 'available' }, { new: true });
    if (!car) {
        throw new Error('Car not found');
    }
    const totalCost = (0, cars_utils_1.calculateTotalCost)(booking.startTime, endTime, car.pricePerHour);
    const updatedBooking = yield booking_model_1.default.findByIdAndUpdate(bookingId, { endTime, totalCost }, { new: true, runValidators: true }).populate('car').populate('user');
    if (!updatedBooking) {
        throw new Error('Failed to update booking');
    }
    return updatedBooking;
});
exports.CarsServices = {
    createCarsIntoDB,
    getAllCarsFromDB,
    getSingleCar,
    updateCarIntoDB,
    deleteCarIntoDB,
    returnCarService
};

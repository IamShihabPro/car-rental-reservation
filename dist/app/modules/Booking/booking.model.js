"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    car: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Car', required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 },
    idType: { type: String, required: true },
    idNumber: { type: String, required: true },
    drivingLicense: { type: String, required: true },
    paymentMethod: { type: String, default: '' },
    transactionId: { type: String },
    isConfirm: { type: Boolean, required: true, default: false },
    isCancel: { type: Boolean, required: true, default: false },
    isCarReturn: { type: Boolean, required: true, default: false },
    isPaid: { type: Boolean, required: true, default: false },
    isDelete: { type: Boolean, required: true, default: false },
}, {
    timestamps: true
});
// Middleware to exclude deleted cars
bookingSchema.pre('find', function (next) {
    this.where({ isDeleted: { $ne: true } });
    this.where({ isCancel: { $ne: true } });
    next();
});
bookingSchema.pre('findOne', function (next) {
    this.where({ isDeleted: { $ne: true } });
    this.where({ isCancel: { $ne: true } });
    next();
});
const Booking = (0, mongoose_1.model)('Booking', bookingSchema);
exports.default = Booking;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// car.model.ts
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
});
// Middleware to exclude deleted cars
carSchema.pre('find', function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});
carSchema.pre('findOne', function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});
const Car = (0, mongoose_1.model)('Car', carSchema);
exports.default = Car;

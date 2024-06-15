"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalCost = void 0;
// utils/calculateTotalCost.ts
const calculateTotalCost = (startTime, endTime, pricePerHour) => {
    const start = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // duration in hours
    return duration * pricePerHour;
};
exports.calculateTotalCost = calculateTotalCost;

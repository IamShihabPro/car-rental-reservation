import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import Booking from "../Booking/booking.model";
import { TCar } from "./cars.interface";
import Car from "./cars.model";
import { calculateTotalCost } from "./cars.utils";
import mongoose from "mongoose";
import { User } from "../User/user.model";


const createCarsIntoDB = async(payload: TCar)=>{
    const result = await Car.create(payload)
    return result
}

const getAllCarsFromDB = async (query: Record<string, unknown>) => {
    const CarSearchableFields = ['name'];
    const carsQuery = new QueryBuilder(
      Car.find(),
      query,
    )
      .search(CarSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await carsQuery.modelQuery;
    return result;
};

const getSingleCar = async(id: string) =>{
    const result = await Car.findById(id)
    return result
}

const updateCarIntoDB = async(id: string, payload: Partial<TCar>)=>{
  const result = await Car.findByIdAndUpdate(id, payload, {new: true})
  return result
}

const deleteCarIntoDB = async(id: string) =>{
  const result = await Car.findByIdAndUpdate(id, {isDeleted: true})
  return result
}


const returnCarService = async (bookingId: string, endTime: string) => {
  try {
      // Find the booking by ID and populate the associated user and car
      const booking = await Booking.findById(bookingId).populate('carId').populate('userId');

      if (!booking) {
          throw new Error('Booking not found');
      }

      // Update the car status to 'available'
      const car = await Car.findByIdAndUpdate(
          booking.carId,
          { status: 'available' },
          { new: true }
      );

      if (!car) {
          throw new Error('Car not found');
      }

      // Calculate total cost based on the difference between startTime and endTime
      const totalCost = calculateTotalCost(booking.startTime, endTime, car.pricePerHour);

      // Update the booking with new endTime and totalCost
      const updatedBooking = await Booking.findByIdAndUpdate(
          bookingId,
          { endTime, totalCost },
          { new: true, runValidators: true }
      ).populate('carId').populate('userId');

      if (!updatedBooking) {
          throw new Error('Failed to update booking');
      }

      return updatedBooking;
  } catch (error) {
      throw error; // Throw any errors encountered for centralized error handling
  }
};




export const CarsServices = {
    createCarsIntoDB,
    getAllCarsFromDB,
    getSingleCar,
    updateCarIntoDB,
    deleteCarIntoDB,
    returnCarService
}
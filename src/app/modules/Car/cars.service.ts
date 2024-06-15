import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import Booking from "../Booking/booking.model";
import { TCar } from "./cars.interface";
import Car from "./cars.model";
import { calculationTotalDurationTime } from "./cars.utils";
import mongoose from "mongoose";


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
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Find the booked record using bookingId
    const findBook = await Booking.findById(bookingId).session(session);
    if (!findBook) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    const { carId, startTime } = findBook;

    // Update the car's status to 'available'
    const findCar = await Car.findByIdAndUpdate(
      carId,
      { status: 'available' },
      { new: true, runValidators: true }
    ).session(session);

    if (!findCar) {
      throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
    }

    // Calculate total cost based on startTime, endTime, and car's pricePerHour
    const pricePerHour = findCar.pricePerHour as number;
    const totalCost = calculationTotalDurationTime(startTime, endTime, pricePerHour);

    // Update the booking record with endTime and totalCost
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { endTime, totalCost },
      { new: true, runValidators: true }
    )
      .populate('user')
      .populate('carId')
      .session(session);

    if (!updatedBooking) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    await session.commitTransaction();
    session.endSession();

    return updatedBooking;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
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
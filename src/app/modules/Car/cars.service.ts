import QueryBuilder from "../../builder/QueryBuilder";
import Booking from "../Booking/booking.model";
import { TCar } from "./cars.interface";
import Car from "./cars.model";
import { calculateTotalCost } from "./cars.utils";

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
  const result = await Car.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
  return result
}


const returnCarService = async (bookingId: string, endTime: string) => {
      const booking = await Booking.findById(bookingId).populate('car').populate('user');

      if (!booking) {
          throw new Error('Booking not found');
      }

      const car = await Car.findByIdAndUpdate(
          booking.car,
          { status: 'available' },
          { new: true }
      );

      if (!car) {
          throw new Error('Car not found');
      }

      const totalCost = calculateTotalCost(booking.startTime, endTime, car.pricePerHour);

      const updatedBooking = await Booking.findByIdAndUpdate(
          bookingId,
          { endTime, totalCost, isCarReturn: true },
          { new: true, runValidators: true }
      ).populate({
        path: 'user',
        select: '-password -isDeleted -createdAt -updatedAt' 
    }).populate('car');

      if (!updatedBooking) {
          throw new Error('Failed to update booking');
      }

      return updatedBooking;
  
};


export const CarsServices = {
    createCarsIntoDB,
    getAllCarsFromDB,
    getSingleCar,
    updateCarIntoDB,
    deleteCarIntoDB,
    returnCarService
}
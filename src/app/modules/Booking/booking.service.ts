import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder"
import AppError from "../../errors/AppError";
import Car from "../car/cars.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface"
import Booking from "./booking.model"
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";


interface CreateBookingParams extends Partial<TBooking> {
  carId?: string;
}

const createBookingIntoDB = async(payload: CreateBookingParams, userData: JwtPayload)=>{

    const userInfo = await User.findOne({ email: userData.email });
    // const transactionId = `TXN-${Date.now()}`;

    if (!userInfo) {
      throw new AppError(httpStatus.NOT_FOUND, " User not found!!");
    }

    payload.user = userInfo._id;
    // payload.transactionId = transactionId;
    
    const { carId, ...restPayload } = payload;

    if (carId) {
        // Convert carId to ObjectId
        const carObjectId = new Types.ObjectId(carId);

        // Check if the car is available
        const car = await Car.findOne({ _id: carObjectId, status: 'available' });
        if (!car) {
            throw new Error('Car is not available for booking');
        }

        restPayload.car = carObjectId;

        // Create booking
        const createdBooking = await Booking.create(restPayload);

        const populatedBooking = await Booking.populate(createdBooking, { path: 'user', select: '-password -createdAt -updatedAt -isDeleted' });
        const result = await Booking.populate(populatedBooking, { path: 'car' });

        await Car.updateOne({ _id: carObjectId }, { status: 'unavailable' });
        return result;

    } else {
        throw new Error('carId is required');
    }
}


const getAllBookingsFromDB = async(query: Record<string, unknown>) =>{
  const BookingSearchableFields = ['car', 'date']
  if (query.carId) {
    query.car = query.carId;
    delete query.carId;
  }

  const bookingQuery = new QueryBuilder(Booking.find().populate({
    path: 'user',
    select: '-password -isDeleted -createdAt -updatedAt' 
    }).populate('car'), query).search(BookingSearchableFields).filter().sort().paginate().fields();

  const result = await bookingQuery.modelQuery
  return result
}

const getSingleBooking = async(id: string) =>{
  const result = await Booking.findById(id)
  return result
}


const getMyBookingsFromDB = async (email: string) => {
    try {
  
      const userData = await User.find({ email });
      if (!userData || userData.length === 0) {
        console.error('User not found');
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
      }
  
      const users = userData[0];
  
      const user = users._id;
  
      const bookings = await Booking.find({ user })
      .populate({
        path: 'user',
        select: '-password -isDeleted -createdAt -updatedAt'
    })
      .populate('car')
  
      if (!bookings || bookings.length === 0) {
        console.error('No bookings found');
        throw new AppError(httpStatus.NOT_FOUND, 'No bookings found');
      }
  
      return bookings;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  };

  const updateBookingIntoDB = async(id: string, payload: Partial<TBooking>)=>{
    const result = await Booking.findByIdAndUpdate(id, payload, {new: true})
    return result
  }



  //   const result = await Car.findByIdAndUpdate(id, {isDeleted: true}, {new: true})

  const cancelBookingIntoDB = async (id: string) => {
    // Find the booking by ID and ensure it belongs to the user
    const booking = await Booking.findByIdAndUpdate(
      id ,
      { isCancel: true },
      { new: true }
    );
  
    if (!booking) {
      throw new Error("Booking not found or you are not authorized to cancel this booking");
    }
  
    // Update the car status to 'available' if the booking is successfully cancelled
    const car = await Car.findByIdAndUpdate(
      booking.car,
      { status: "available" },
      { new: true }
    );
  
    if (!car) {
      throw new Error("Car not found");
    }
  
    return booking;
  };


  const deleteBookingIntoDB = async (id: string) => {
    const booking = await Booking.findByIdAndUpdate(
      id ,
      { isDelete: true },
      { new: true }
    );
  
    if (!booking) {
      throw new Error("Booking not found or you are not authorized to cancel this booking");
    }
  
    // Update the car status to 'available' if the booking is successfully cancelled
    const car = await Car.findByIdAndUpdate(
      booking.car,
      { status: "available" },
      { new: true }
    );
  
    if (!car) {
      throw new Error("Car not found");
    }
  };
  
  export default deleteBookingIntoDB;
  

export const BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getMyBookingsFromDB,
    updateBookingIntoDB,
    cancelBookingIntoDB,
    deleteBookingIntoDB,
    getSingleBooking,
}
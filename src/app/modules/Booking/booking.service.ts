import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder"
import AppError from "../../errors/AppError";
import Car from "../Car/cars.model";
import { User } from "../User/user.model";
import { TBooking } from "./booking.interface"
import Booking from "./booking.model"
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";



interface CreateBookingParams extends Partial<TBooking> {
  carId?: string;
}

const createBookingIntoDB = async(payload: CreateBookingParams, userData: JwtPayload)=>{

    const userInfo = await User.findOne({ email: userData.email });

    if (!userInfo) {
      throw new AppError(httpStatus.NOT_FOUND, " User not found!!");
    }

    payload.user = userInfo._id;
    
    const { carId, ...restPayload } = payload;

    if (carId) {
        // Convert carId to ObjectId
        const carObjectId = new Types.ObjectId(carId);

        // Check if the car is available
        const car = await Car.findOne({ _id: carObjectId, status: 'available' });
        if (!car) {
            throw new Error('Car is not available for booking');
        }

        // Assign carObjectId to car in the payload
        restPayload.car = carObjectId;

        // Create booking
        const createdBooking = await Booking.create(restPayload);

        const populatedBooking = await Booking.populate(createdBooking, { path: 'user' });
        const result = await Booking.populate(populatedBooking, { path: 'car' });

        await Car.updateOne({ _id: carObjectId }, { status: 'unavailable' });
        return result;

    } else {
        throw new Error('carId is required');
    }
}


const getAllBookingsFromDB = async(query: Record<string, unknown>) =>{
    const BookingSearchableFields = ['car', 'date']
    const bookingQuery = new QueryBuilder(Booking.find().populate('user').populate('car'), query).search(BookingSearchableFields).filter().sort().paginate().fields();

    const result = await bookingQuery.modelQuery
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
      .populate('user')
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
  
  

export const BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getMyBookingsFromDB
}
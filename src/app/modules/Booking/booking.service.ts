import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder"
import AppError from "../../errors/AppError";
import Car from "../Car/cars.model";
import { User } from "../User/user.model";
import { TBooking } from "./booking.interface"
import Booking from "./booking.model"

const createBookingIntoDB = async(payload: TBooking)=>{

    const { carId } = payload;

    // Check if the car is available
    const car = await Car.findOne({ _id: carId, status: 'available' });
    if (!car) {
      throw new Error('Car is not available for booking');
    }

    const result = await Booking.create(payload)
    await Car.updateOne({ _id: carId }, { status: 'unavailable' });
    return result
}


const getAllBookingsFromDB = async(query: Record<string, unknown>) =>{
    const BookingSearchableFields = ['carId', 'date']
    const bookingQuery = new QueryBuilder(Booking.find().populate('userId').populate('carId'), query).search(BookingSearchableFields).filter().sort().paginate().fields();

    const result = await bookingQuery.modelQuery
    return result
}

// const getASingleBookingsFromDB =  async(id: string) =>{
//     const result = await Booking.findById(id)
//     return result
// }

const getMyBookingsFromDB = async (email: string) => {
    try {
      console.log('Searching for user with email:', email);
  
      const users = await User.find({ email });
      if (!users || users.length === 0) {
        console.error('User not found');
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
      }
  
      const user = users[0];
      console.log('Found user:', user);
  
      const userId = user._id;
      console.log('User ID:', userId);
  
      const bookings = await Booking.find({ userId })
      .populate('userId')
      .populate('carId')
  
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
    // getASingleBookingsFromDB,
    getMyBookingsFromDB
}
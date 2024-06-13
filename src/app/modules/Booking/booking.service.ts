import QueryBuilder from "../../builder/QueryBuilder"
import Car from "../Car/cars.model";
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

const getASingleBookingsFromDB =  async(id: string) =>{
    const result = await Booking.findById(id)
    return result
}

export const BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getASingleBookingsFromDB
}
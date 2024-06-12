import QueryBuilder from "../../builder/QueryBuilder"
import { TBooking } from "./booking.interface"
import Booking from "./booking.model"

const createBookingIntoDB = async(payload: TBooking)=>{
    const result = await Booking.create(payload)
    return result
}


const getAllBookingsFromDB = async(query: Record<string, unknown>) =>{
    const BookingSearchableFields = ['carId', 'date', 'isBooked']
    const bookingQuery = new QueryBuilder(Booking.find().populate('userId').populate('carId'), query).search(BookingSearchableFields).filter().sort().paginate().fields();

    const result = await bookingQuery.modelQuery
    return result
}

export const BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB
}
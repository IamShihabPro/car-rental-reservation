import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { bookingValidations } from './booking.validation'
import { BookingControllers } from './booking.controller'

const router = express.Router()

router.post('/', validateRequest(bookingValidations.createBookingValidation), BookingControllers.createBooking)
router.get('/', BookingControllers.getAllBookings)
router.get('/:mybookings', BookingControllers.getSingleBookings)

export const BookingRoutes = router
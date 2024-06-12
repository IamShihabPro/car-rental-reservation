import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { bookingValidations } from './booking.validation'
import { BookingControllers } from './booking.controller'

const router = express.Router()

router.post('/create-bookings', validateRequest(bookingValidations.createBookingValidation), BookingControllers.createBooking)

export const BookingRoutes = router
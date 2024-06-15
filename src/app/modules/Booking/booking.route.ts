import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { bookingValidations } from './booking.validation'
import { BookingControllers } from './booking.controller'
import { auth } from '../../middlewares/auth'
import { USER_ROLE } from '../User/user.constant'

const router = express.Router()

router.post('/',auth(USER_ROLE.user), validateRequest(bookingValidations.createBookingValidation), BookingControllers.createBooking)
router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings)
// router.get('/:id', BookingControllers.getSingleBookings)

router.get('/my-bookings', auth(USER_ROLE.user), BookingControllers.getMyBookings);

export const BookingRoutes = router
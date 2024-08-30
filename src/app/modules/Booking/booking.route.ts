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

router.put('/:id', auth(USER_ROLE.admin), validateRequest(bookingValidations.updateBookingValidation), BookingControllers.updateBooking)

router.put('/cancel/:id', auth(USER_ROLE.user), validateRequest(bookingValidations.updateBookingValidation), BookingControllers.cancelBooking)

router.delete('/:id', auth(USER_ROLE.admin), BookingControllers.deleteBooking)


export const BookingRoutes = router
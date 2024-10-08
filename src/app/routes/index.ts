import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { CarsRoutes } from "../modules/Car/cars.route";
import { BookingRoutes } from "../modules/Booking/booking.route";
import { SignInRoutes } from "../modules/Auth/auth.route";
import { PaymentRoutes } from "../modules/Payment/payment.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/auth',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: SignInRoutes
    },
    {
        path: '/cars',
        route: CarsRoutes
    },
    {
        path: '/bookings',
        route: BookingRoutes
    },
    {
        path: '/payment',
        route: PaymentRoutes
    },
]


moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
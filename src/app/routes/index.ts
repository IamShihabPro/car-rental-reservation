import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { CarsRoutes } from "../modules/car/cars.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { SignInRoutes } from "../modules/auth/auth.route";
import { PaymentRoutes } from "../modules/payment/payment.route";


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
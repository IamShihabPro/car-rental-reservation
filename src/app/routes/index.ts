import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { CarsRoutes } from "../modules/Car/cars.route";
import { BookingRoutes } from "../modules/Booking/booking.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/cars',
        route: CarsRoutes
    },
    {
        path: '/bookings',
        route: BookingRoutes
    },
]


moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
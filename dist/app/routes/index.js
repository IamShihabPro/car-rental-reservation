"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const cars_route_1 = require("../modules/car/cars.route");
const booking_route_1 = require("../modules/booking/booking.route");
// import { SignInRoutes } from "../modules/Auth/auth.route";
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.UserRoutes
    },
    // {
    //     path: '/auth',
    //     route: SignInRoutes
    // },
    {
        path: '/cars',
        route: cars_route_1.CarsRoutes
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;

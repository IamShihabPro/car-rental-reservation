"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const cars_route_1 = require("../modules/car/cars.route");
const booking_route_1 = require("../modules/booking/booking.route");
const auth_route_1 = require("../modules/auth/auth.route");
const payment_route_1 = require("../modules/payment/payment.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.UserRoutes
    },
    {
        path: '/auth',
        route: auth_route_1.SignInRoutes
    },
    {
        path: '/cars',
        route: cars_route_1.CarsRoutes
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes
    },
    {
        path: '/payment',
        route: payment_route_1.PaymentRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;

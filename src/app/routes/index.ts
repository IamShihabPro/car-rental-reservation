import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { CarsRoutes } from "../modules/Car/cars.route";


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
]


moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
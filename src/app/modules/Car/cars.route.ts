import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CarsValidations } from './cars.validation'
import { CarsController } from './cars.controller'
import { auth } from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()
router.post('/', auth(USER_ROLE.admin), validateRequest(CarsValidations.createCarsValidation), CarsController.createCars)

router.put('/return', auth(USER_ROLE.admin), CarsController.returnCar)

router.get('/', CarsController.getAllCars)

router.get('/:id', CarsController.getSingleCar)

router.delete('/:id', auth(USER_ROLE.admin), CarsController.deleteCar)

router.put('/:id', auth(USER_ROLE.admin), validateRequest(CarsValidations.updateCarsValidation), CarsController.updateCar)


export const CarsRoutes = router
import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CarsValidations } from './cars.validation'
import { CarsController } from './cars.controller'

const router = express.Router()
router.post('/create-cars', validateRequest(CarsValidations.createCarsValidation), CarsController.createCars)

router.get('/', CarsController.getAllCars)

router.get('/:id', CarsController.getSingleCar)

export const CarsRoutes = router
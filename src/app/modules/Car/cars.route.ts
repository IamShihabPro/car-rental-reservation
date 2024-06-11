import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CarsValidations } from './cars.validation'
import { CarsController } from './cars.controller'

const router = express.Router()
router.post('/create-cars', validateRequest(CarsValidations.createCarsValidation), CarsController.createCars)

export const CarsRoutes = router
import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { authValidations } from './auth.validation'

const router = express.Router()

router.post('/singup', validateRequest(authValidations.signupValidation),)
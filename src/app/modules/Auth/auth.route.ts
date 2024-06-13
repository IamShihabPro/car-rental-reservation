import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { authSignInValidations } from './auth.validation'
import { AuthController } from './auth.controller'

const router = express.Router()

router.post('/signin', validateRequest(authSignInValidations.signinValidation), AuthController.signIn)

export const SignInRoutes = router;
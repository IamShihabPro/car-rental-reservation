import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { authSignInValidations } from './auth.validation'

const router = express.Router()

router.post('/singin', validateRequest(authSignInValidations.signinValidation))

export const SignInRoutes = router;
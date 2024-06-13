import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
const router = express.Router();

router.post('/signup',
  validateRequest(UserValidation.createUserValidation),  UserControllers.signUpUser
);


export const UserRoutes = router;
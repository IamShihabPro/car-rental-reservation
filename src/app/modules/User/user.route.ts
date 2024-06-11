import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
const router = express.Router();

router.post('/create-admin',
  validateRequest(UserValidation.createUserValidation),  UserControllers.createAdmin
);


export const UserRoutes = router;
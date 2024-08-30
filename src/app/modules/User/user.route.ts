import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
const router = express.Router();

router.post('/signup',
  validateRequest(UserValidation.createUserValidation),  UserControllers.signUpUser
);

router.get('/', UserControllers.getAllUsers)
router.get('/:id', UserControllers.getSingleUser)
router.get('/user/:email', UserControllers.getSingleUserByEmail)


export const UserRoutes = router;
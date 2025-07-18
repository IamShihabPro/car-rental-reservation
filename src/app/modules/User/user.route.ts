import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import { USER_ROLE } from './user.constant';
import { auth } from '../../middlewares/auth';
const router = express.Router();

router.post('/signup',
  validateRequest(UserValidation.createUserValidation),  UserControllers.signUpUser
);

router.get('/', UserControllers.getAllUsers)
router.get('/:id', UserControllers.getSingleUser)
router.get('/user/:email', UserControllers.getSingleUserByEmail)

router.put('/user/:id', auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(UserValidation.updateUserValidation), UserControllers.updateUser)

router.delete('/:id', auth(USER_ROLE.admin), UserControllers.deleteUser)


export const UserRoutes = router;
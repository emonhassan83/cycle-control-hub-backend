import express from 'express';
import zodValidationRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/auth/register',
  zodValidationRequest(UserValidation.UserValidationSchema),
  UserControllers.registerUser,
);

router.get('/users/:id', auth(USER_ROLE.user), UserControllers.getAUser);

router.get('/users', auth(USER_ROLE.user), UserControllers.getAllUsers);

export const UserRoutes = router;

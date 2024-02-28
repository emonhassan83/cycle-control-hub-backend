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

router.patch(
  '/user/change-role',
  auth(USER_ROLE.admin),
  UserControllers.changeUserRole,
);

router.put(
  '/user/update-user/:id',
  auth(USER_ROLE.admin, USER_ROLE.seller, USER_ROLE.buyer),
  UserControllers.updateUserInfo,
);

router.get(
  '/users/:id',
  auth(USER_ROLE.admin, USER_ROLE.seller, USER_ROLE.buyer),
  UserControllers.getAUser,
);

router.get(
  '/users',
  auth(USER_ROLE.admin, USER_ROLE.seller, USER_ROLE.buyer),
  UserControllers.getAllUsers,
);

export const UserRoutes = router;

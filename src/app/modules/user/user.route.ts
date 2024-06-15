import express from 'express';
import zodValidationRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/register',
  zodValidationRequest(UserValidation.UserValidationSchema),
  UserControllers.registerUser,
);

router.patch(
  '/change-role',
  auth(USER_ROLE.admin),
  UserControllers.changeUserRole,
);

router.put(
  '/update-user/:id',
  auth(USER_ROLE.admin),
  UserControllers.updateUserInfo,
);

router.delete(
  '/delete-user/:id',
  auth(USER_ROLE.admin),
  UserControllers.deleteAUser,
);

router.get(
  '/users',
  auth(USER_ROLE.admin, USER_ROLE.seller, USER_ROLE.buyer),
  UserControllers.getAllUsers,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.seller, USER_ROLE.buyer),
  UserControllers.getAUser,
);


export const UserRoutes = router;

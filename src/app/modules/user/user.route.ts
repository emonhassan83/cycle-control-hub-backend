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
  zodValidationRequest(UserValidation.changeUserRoleValidationSchema),
  UserControllers.changeUserRole,
);

router.patch(
  '/change-status',
  auth(USER_ROLE.admin),
  zodValidationRequest(UserValidation.changeUserStatusValidationSchema),
  UserControllers.changeUserStatus,
);

router.put(
  '/update-user/:id',
  auth(USER_ROLE.admin, USER_ROLE.seller, USER_ROLE.buyer, USER_ROLE.user),
  zodValidationRequest(UserValidation.UserUpdateValidationSchema),
  UserControllers.updateUserInfo,
);

router.patch(
  '/soft-delete',
  auth(USER_ROLE.admin),
  zodValidationRequest(UserValidation.UserSoftDeleteValidationSchema),
  UserControllers.softDeleteAUser,
);

router.delete(
  '/delete-user/:id',
  auth(USER_ROLE.admin),
  UserControllers.deleteAUser,
);

router.get(
  '/users',
  auth(USER_ROLE.admin, USER_ROLE.seller, USER_ROLE.buyer, USER_ROLE.user),
  UserControllers.getAllUsers,
);

router.get(
  '/my-profile',
  auth(USER_ROLE.admin, USER_ROLE.seller, USER_ROLE.buyer, USER_ROLE.user),
  UserControllers.getMyProfile,
);

export const UserRoutes = router;

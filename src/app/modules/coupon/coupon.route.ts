import express from 'express';
import zodValidationRequest from '../../middleware/validateRequest';
import { CouponValidation } from './coupon.validation';
import { CouponControllers } from './coupon.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-coupon',
  auth(USER_ROLE.admin),
  zodValidationRequest(CouponValidation.createCouponValidationSchema),
  CouponControllers.createCoupon,
);

router.put(
  '/update-coupon/:id',
  auth(USER_ROLE.admin),
  zodValidationRequest(CouponValidation.updateCouponValidationSchema),
  CouponControllers.updateCoupon,
);

router.delete(
  '/delete-coupon/:id',
  auth(USER_ROLE.admin),
  CouponControllers.deleteACoupon,
);

router.get(
  '/all-coupons',
  auth(USER_ROLE.admin, USER_ROLE.seller, USER_ROLE.buyer),
  CouponControllers.getAllCoupons,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin),
  CouponControllers.getACoupon,
);

export const CouponRoutes = router;

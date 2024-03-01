import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BikeRoutes } from '../modules/bikeManagement/bike.route';
import { BuyerRoutes } from '../modules/buyerManagement/buyerManagement.route';
import { CouponRoutes } from '../modules/coupon/coupon.route';
import { ServiceCategoryRoutes } from '../modules/bikeServiceCategory/serviceCategory.route';
import { ServiceRoutes } from '../modules/bikeService/bikeService.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/bike-management',
    route: BikeRoutes,
  },
  {
    path: '/buyer',
    route: BuyerRoutes,
  },
  {
    path: '/coupon',
    route: CouponRoutes,
  },
  {
    path: '/service-category',
    route: ServiceCategoryRoutes,
  },
  {
    path: '/service',
    route: ServiceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

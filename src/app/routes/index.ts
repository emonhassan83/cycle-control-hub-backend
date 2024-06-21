import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BikeRoutes } from '../modules/bikeManagement/bike.route';
import { BuyerRoutes } from '../modules/buyerManagement/buyerManagement.route';
import { CouponRoutes } from '../modules/coupon/coupon.route';
import { ServiceCategoryRoutes } from '../modules/bikeServiceCategory/serviceCategory.route';
import { ServiceRoutes } from '../modules/bikeService/bikeService.route';
import { BikeProductRoutes } from '../modules/bikeProduct/bikeProduct.routes';
import { ReviewRoutes } from '../modules/review/review.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/bike',
    route: BikeRoutes,
  },
  {
    path: '/product',
    route: BikeProductRoutes,
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
  {
    path: '/review',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

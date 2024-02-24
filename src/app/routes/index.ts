import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BikeRoutes } from '../modules/bikeManagement/bike.route';
import { BuyerRoutes } from '../modules/buyerManagement/buyerManagement.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

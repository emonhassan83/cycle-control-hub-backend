import express from 'express';
import zodValidationRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';
import { ServiceCategoryControllers } from './serviceCategory.controller';
import { BikeServiceCategoryValidation } from './serviceCategory.validation';

const router = express.Router();

router.post(
  '/create-service-category',
  auth(USER_ROLE.admin, USER_ROLE.seller),
  zodValidationRequest(BikeServiceCategoryValidation.createBikeServiceCategoryValidationSchema),
  ServiceCategoryControllers.createBikeServiceCategory,
);

router.put(
  '/update-service-category/:id',
  auth(USER_ROLE.admin, USER_ROLE.seller),
  zodValidationRequest(BikeServiceCategoryValidation.updateBikeServiceCategoryValidationSchema),
  ServiceCategoryControllers.updateBikeServiceCategory,
);

router.delete(
  '/delete-service-category/:id',
  auth(USER_ROLE.admin, USER_ROLE.seller),
  ServiceCategoryControllers.deleteABikeServiceCategory,
);

router.get(
  '/all-service-category',
  auth(USER_ROLE.admin, USER_ROLE.seller),
  ServiceCategoryControllers.getAllBikeServiceCategories,
);

router.get(
  '/service-category/:id',
  auth(USER_ROLE.admin, USER_ROLE.seller),
  ServiceCategoryControllers.getABikeServiceCategory,
);

export const ServiceCategoryRoutes = router;

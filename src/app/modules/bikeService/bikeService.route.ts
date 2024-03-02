import express from 'express';
import zodValidationRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';
import { ServiceHistoryControllers } from './bikeService.controller';
import { BikeServiceHistoryValidation } from './bikeService.validation';


const router = express.Router();

router.post(
  '/request-service',
  auth(USER_ROLE.buyer),
  zodValidationRequest(BikeServiceHistoryValidation.createServiceHistoryValidationSchema),
  ServiceHistoryControllers.requestAService,
);

router.put(
  '/update-service/:id',
  auth(USER_ROLE.buyer),
  zodValidationRequest(BikeServiceHistoryValidation.updateServiceHistoryValidationSchema),
  ServiceHistoryControllers.updateAService,
);

router.patch(
  '/confirm-service/:id',
  auth(USER_ROLE.admin, USER_ROLE.seller),
  ServiceHistoryControllers.confirmAService,
);

router.patch(
  '/cancel-service/:id',
  auth(USER_ROLE.admin, USER_ROLE.seller),
  ServiceHistoryControllers.cancelAService,
);

router.delete(
  '/delete-service/:id',
  auth(USER_ROLE.admin, USER_ROLE.seller),
  ServiceHistoryControllers.deleteAService,
);

router.get(
  '/all-services',
  auth(USER_ROLE.admin, USER_ROLE.seller),
  ServiceHistoryControllers.getAllServices,
);

router.get(
  '/all-my-services',
  auth(USER_ROLE.admin, USER_ROLE.seller),
  ServiceHistoryControllers.getMyServices,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.seller),
  ServiceHistoryControllers.getAService,
);

export const ServiceRoutes = router;

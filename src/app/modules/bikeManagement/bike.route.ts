import express from "express";
import { bikeControllers } from "./bike.controller";
import zodValidationRequest from "../../middleware/validateRequest";
import { bikeValidations } from "./bike.validation";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/add-bike",
  auth(USER_ROLE.user),
  zodValidationRequest(bikeValidations.createBikeValidationSchema),
  bikeControllers.addBike
);

router.put(
  "/sales-bike/:id",
  auth(USER_ROLE.user),
  zodValidationRequest(bikeValidations.salesBikeValidationSchema),
  bikeControllers.createSalesBike
);

router.put(
  "/update-bike/:id",
  auth(USER_ROLE.user),
  zodValidationRequest(bikeValidations.updateBikeValidationSchema),
  bikeControllers.updateABike
);

router.get(
  "/all-bike",
   auth(USER_ROLE.user),
   bikeControllers.getAllBike
);

router.get(
  "/all-sales-bike",
   auth(USER_ROLE.user),
   bikeControllers.getSalesBike
);

router.get(
  "/all-seller-bike",
   auth(USER_ROLE.user),
   bikeControllers.getSellerAllBike
);

router.get(
  "/bike/:id",
   auth(USER_ROLE.user),
   bikeControllers.getABike
);

router.delete(
  "/delete-bike/:id",
   auth(USER_ROLE.user),
   bikeControllers.deleteABike
);

router.delete(
  "/bulk-delete-bikes",
   auth(USER_ROLE.user),
   bikeControllers.bulkDeleteBikes
);

export const BikeRoutes = router;
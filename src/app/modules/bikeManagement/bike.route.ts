import express from "express";
import { bikeControllers } from "./bike.controller";
import zodValidationRequest from "../../middleware/validateRequest";
import { bikeValidations } from "./bike.validation";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/add-bike",
  auth(USER_ROLE.admin ,USER_ROLE.seller),
  zodValidationRequest(bikeValidations.createBikeValidationSchema),
  bikeControllers.addBike
);

//* create sale bike
router.post(
  "/create-sale-bike",
  auth(USER_ROLE.admin ,USER_ROLE.seller),
  zodValidationRequest(bikeValidations.createSalesBikeValidationSchema),
  bikeControllers.createSalesBike
);

router.put(
  "/update-bike/:id",
  auth(USER_ROLE.admin ,USER_ROLE.seller),
  zodValidationRequest(bikeValidations.updateBikeValidationSchema),
  bikeControllers.updateABike
);

router.get(
  "/all-bike",
   auth(USER_ROLE.admin ,USER_ROLE.seller, USER_ROLE.buyer),
   bikeControllers.getAllBike
);

//* get all sales bike
router.get(
  "/all-sales-bike",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
   bikeControllers.getSalesBike
);

router.get(
  "/all-seller-bike",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
   bikeControllers.getSellerAllBike
);

//* get a sale bike
router.get(
  "/sale-bike/:id",
   auth(USER_ROLE.admin ,USER_ROLE.seller, USER_ROLE.buyer),
   bikeControllers.getASaleBike
);

router.delete(
  "/delete-bike/:id",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
   bikeControllers.deleteABike
);

router.delete(
  "/bulk-delete-bikes",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
   bikeControllers.bulkDeleteBikes
);

router.get(
  "/seller-sale-bikes",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
   bikeControllers.getSellerAllSaleBike
);

router.put(
  "/update-sale-bike/:id",
  auth(USER_ROLE.admin ,USER_ROLE.seller),
  zodValidationRequest(bikeValidations.updateSalesBikeValidationSchema),
  bikeControllers.updateASaleBike
);

router.delete(
  "/delete-sale-bike/:id",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
   bikeControllers.deleteASaleBike
);

export const BikeRoutes = router;
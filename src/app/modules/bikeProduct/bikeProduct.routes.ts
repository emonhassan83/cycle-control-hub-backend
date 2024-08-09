import express from "express";
import zodValidationRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middleware/auth";
import { bikeProductValidations } from "./bikeProduct.validation";
import { productControllers } from "./bikeProduct.controller";

const router = express.Router();

router.post(
  "/add-product",
  auth(USER_ROLE.admin ,USER_ROLE.seller),
  zodValidationRequest(bikeProductValidations.createBikeProductValidationSchema),
  productControllers.addProduct
);

router.put(
  "/update-product/:id",
  auth(USER_ROLE.admin ,USER_ROLE.seller),
  zodValidationRequest(bikeProductValidations.updateBikeProductValidationSchema),
  productControllers.updateAProduct
);

router.get(
  "/all-products",
   auth(USER_ROLE.admin ,USER_ROLE.seller, USER_ROLE.buyer),
   productControllers.getAllProduct
);

router.get(
  "/all-seller-products",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
   productControllers.getSellerAllProduct
);

router.get(
  "/product/:id",
   auth(USER_ROLE.admin ,USER_ROLE.seller, USER_ROLE.buyer),
   productControllers.getAProduct
);

router.delete(
  "/delete-product/:id",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
   productControllers.deleteAProduct
);

export const BikeProductRoutes = router;
import express from "express";
import zodValidationRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middleware/auth";
import { buyerControllers } from "./buyerManagement.controller";
import { buyerValidations } from "./buyerManagement.validation";

const router = express.Router();

router.post(
  "/purchase-bike",
  auth(USER_ROLE.user),
  zodValidationRequest(buyerValidations.buyingBikeValidationSchema),
  buyerControllers.purchaseBike
);

router.get(
  "/purchase-bike",
  auth(USER_ROLE.user),
  buyerControllers.viewPurchaseBike
);

router.get(
  "/all-purchase-bike",
  auth(USER_ROLE.user),
  buyerControllers.viewAllPurchaseBike
);

router.put(
  "/confirm-purchase/:id",
  auth(USER_ROLE.user),
  buyerControllers.confirmPurchaseBike
);

router.delete(
  "/cancel-purchase/:id",
  auth(USER_ROLE.user),
  buyerControllers.cancelPurchaseBike
);

router.get(
  "/daily-sales",
  auth(USER_ROLE.user),
  buyerControllers.viewDailySales
);

router.get(
  "/weekly-sales",
  auth(USER_ROLE.user),
  buyerControllers.viewWeeklySales
);

router.get(
  "/monthly-sales",
  auth(USER_ROLE.user),
  buyerControllers.viewMonthlySales
);

router.get(
  "/yearly-sales",
  auth(USER_ROLE.user),
  buyerControllers.viewYearlySales
);

export const BuyerRoutes = router;
import express from "express";
import zodValidationRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middleware/auth";
import { buyerControllers } from "./buyerManagement.controller";
import { buyerValidations } from "./buyerManagement.validation";

const router = express.Router();

//! Fix role access
router.post(
  "/purchase-bike",
   auth(USER_ROLE.admin ,USER_ROLE.seller, USER_ROLE.buyer),
  zodValidationRequest(buyerValidations.buyingBikeValidationSchema),
  buyerControllers.purchaseBike
);

router.get(
  "/purchase-bike",
   auth(USER_ROLE.admin ,USER_ROLE.seller, USER_ROLE.buyer),
  buyerControllers.viewPurchaseBike
);

router.get(
  "/all-purchase-bike",
   auth(USER_ROLE.admin ,USER_ROLE.seller, USER_ROLE.buyer),
  buyerControllers.viewAllPurchaseBike
);

router.put(
  "/confirm-purchase/:id",
   auth(USER_ROLE.admin ,USER_ROLE.seller, USER_ROLE.buyer),
  buyerControllers.confirmPurchaseBike
);

router.delete(
  "/cancel-purchase/:id",
   auth(USER_ROLE.admin ,USER_ROLE.seller, USER_ROLE.buyer),
  buyerControllers.cancelPurchaseBike
);

router.get(
  "/daily-sales",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
  buyerControllers.viewDailySales
);

router.get(
  "/weekly-sales",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
  buyerControllers.viewWeeklySales
);

router.get(
  "/monthly-sales",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
  buyerControllers.viewMonthlySales
);

router.get(
  "/yearly-sales",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
  buyerControllers.viewYearlySales
);

export const BuyerRoutes = router;
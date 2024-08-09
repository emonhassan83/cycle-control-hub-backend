import express from "express";
import zodValidationRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middleware/auth";
import { ReviewControllers } from "./review.controller";
import { ReviewValidation } from "./review.validation";

const router = express.Router();

router.post(
  "/add-review",
  auth(USER_ROLE.admin ,USER_ROLE.seller),
  zodValidationRequest(ReviewValidation.createReviewValidationSchema),
  ReviewControllers.createReview
);

router.put(
  "/update-review/:id",
  auth(USER_ROLE.admin ,USER_ROLE.seller),
  zodValidationRequest(ReviewValidation.updateReviewValidationSchema),
  ReviewControllers.updateReview
);

router.get(
  "/all-reviews",
   auth(USER_ROLE.admin ,USER_ROLE.seller, USER_ROLE.buyer),
   ReviewControllers.getAllReview
);

router.get(
  "/user-reviews",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
   ReviewControllers.getAllReviewsByUser
);

router.get(
  "/bike-reviews",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
   ReviewControllers.getAllReviewsByBike
);

router.get(
  "/product-reviews",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
   ReviewControllers.getAllReviewsByProduct
);

router.get(
  "/:id",
   auth(USER_ROLE.admin ,USER_ROLE.seller, USER_ROLE.buyer),
   ReviewControllers.getAReview
);

router.delete(
  "/delete-review/:id",
   auth(USER_ROLE.admin ,USER_ROLE.seller),
   ReviewControllers.deleteAReview
);

export const ReviewRoutes = router;
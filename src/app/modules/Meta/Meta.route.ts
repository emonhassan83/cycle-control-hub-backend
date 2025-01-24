import express from "express";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middleware/auth";
import { MetaController } from "./Meta.controller";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.seller, USER_ROLE.buyer),
  MetaController.fetchDashboardMetaData
);

export const MetaRoutes = router;
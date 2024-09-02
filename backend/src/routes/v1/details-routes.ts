import express from "express";
import { isAuthenticated } from "../../middleware/auth";
import {
  getEmployeePersonalInfo,
  updateEmployeePersonalInfo,
} from "../../controllers/personal-info.controller";

export const detailRouter = express.Router();

detailRouter.get("/personal-info", isAuthenticated, getEmployeePersonalInfo);
detailRouter.put("/personal-info", isAuthenticated, updateEmployeePersonalInfo);

import express from "express";
import {
  createDepartment,
  deleteDepartmentById,
  getAllDepartments,
  getdepartmentById,
  updateDepartmentById,
} from "../../controllers/departments.controller";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth";
import { getEmployeePersonalInfo } from "../../controllers/personal-info.controller";

export const departmentRouter = express.Router();

departmentRouter.post(
  "/create-department",
  isAuthenticated,
  createDepartment
);
departmentRouter.get("/get-all",isAuthenticated, getAllDepartments);
departmentRouter.get("/:departmentId",isAuthenticated, getdepartmentById);
departmentRouter.delete(
  "/:departmentId",
  isAuthenticated,
  deleteDepartmentById
);
departmentRouter.put(
  "/:departmentId",
  isAuthenticated,
  updateDepartmentById
);

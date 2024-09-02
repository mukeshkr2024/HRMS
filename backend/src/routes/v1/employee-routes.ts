import express from "express";
import {
  createEmployee,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
} from "../../controllers/employee.controller";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth";
import { getEmployeePersonalInfo } from "../../controllers/personal-info.controller";

export const employeeRouter = express.Router();

employeeRouter.post(
  "/",
  // isAuthenticated,
  // authorizeRoles("admin", "manager"),
  createEmployee
);
employeeRouter.get("/", isAuthenticated, getAllEmployees);
employeeRouter.get("/:employeeId", isAuthenticated, getEmployeeById);
employeeRouter.delete(
  "/:employeeId",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteEmployeeById
);
employeeRouter.put(
  "/:employeeId",
  isAuthenticated,
  authorizeRoles("admin", "manager"),
  updateEmployeeById
);

import express from "express";
import {
  createEmployee,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
  getEmployeeInfo,
  getEmployeeOptions,
  updateEmployeeById,
} from "../../controllers/employee.controller";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth";

export const employeeRouter = express.Router();

employeeRouter.post(
  "/create",
  // isAuthenticated,
  // authorizeRoles("admin", "manager"),
  createEmployee
);
employeeRouter.get("/options", isAuthenticated, getEmployeeOptions)
employeeRouter.get("/info", isAuthenticated, getEmployeeInfo)
employeeRouter.get("/", isAuthenticated, getAllEmployees); // add authorized roles 
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
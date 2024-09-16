import express from "express";
import {
  createEmployee,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
  getEmployeeInfo,
  getEmployeeOptions,
  updateEmployeeById,
  updateMyInfo,
  uploadAvatar,
  // uploadAvatar,
} from "../../controllers/employee.controller";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth";
import { uploadAvatar as uploadAvatarMiddleware } from "../../utils/upload-avatar";

export const employeeRouter = express.Router();

employeeRouter.post(
  "/create",
  // isAuthenticated,
  // authorizeRoles("admin", "manager"),
  createEmployee
);
employeeRouter.get("/options", isAuthenticated, getEmployeeOptions)
employeeRouter.get("/info", isAuthenticated, getEmployeeInfo)
employeeRouter.get("/short-info", isAuthenticated, getEmployeeInfo) // todo:
employeeRouter.get("/", isAuthenticated, getAllEmployees); // add authorized roles 
employeeRouter.get("/:employeeId", isAuthenticated, getEmployeeById);
employeeRouter.delete(
  "/:employeeId",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteEmployeeById
);
employeeRouter.put("/my-info", isAuthenticated, updateMyInfo)
employeeRouter.put(
  "/:employeeId",
  isAuthenticated,
  authorizeRoles("admin", "manager"),
  updateEmployeeById
);
employeeRouter.post("/avatar/upload",
  isAuthenticated,
  uploadAvatarMiddleware.single("avatar"),
  uploadAvatar
)
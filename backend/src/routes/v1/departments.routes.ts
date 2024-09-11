import express from "express";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,

} from "../../controllers/departments.controller";
import { isAuthenticated } from "../../middleware/auth";

export const departmentRouter = express.Router();

departmentRouter.post(
  "/create",
  isAuthenticated,
  createDepartment
);
departmentRouter.get("/", isAuthenticated, getAllDepartments)
departmentRouter.delete("/:departmentId", isAuthenticated, deleteDepartment)
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecret } from "../config/config";
import { Employee, IEmployee } from "../models/employee.model";
import { ErrorHandler } from "../utils/ErrorHandler";
import { CatchAsyncError } from "./catchAsyncError";

interface CustomRequest extends Request {
  employee?: IEmployee;
}

const Roles = {
  ADMIN: "admin",
  MANAGER: "manager",
  EMPLOYEE: "employee",
} as const;

type Role = (typeof Roles)[keyof typeof Roles];

// isAuthenticated middleware
export const isAuthenticated = CatchAsyncError(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 401)
      );
    }

    try {
      const decoded = jwt.verify(access_token, jwtSecret) as JwtPayload;

      if (!decoded || !decoded.id) {
        return next(new ErrorHandler("Access token is not valid", 400));
      }

      const employee = await Employee.findById(decoded.id);

      if (!employee) {
        return next(new ErrorHandler("Employee not found", 404));
      }

      req.employee = employee;
      next();
    } catch (err) {
      console.error("Authentication error:", err);
      return next(new ErrorHandler("Failed to authenticate", 500));
    }
  }
);

// validate role
export const authorizeRoles = (...roles: Role[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.employee || !roles.includes(req.employee.role as Role)) {
      return next(
        new ErrorHandler(
          `Role ${req.employee?.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

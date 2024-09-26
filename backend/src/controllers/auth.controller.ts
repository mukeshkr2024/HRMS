import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { Employee } from "../models/employee.model";
import { ErrorHandler } from "../utils/ErrorHandler";
import { generateToken } from "../utils/jwt";

// Login employee
export const LoginEmployee = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Normalize email
    const emailLower = email?.trim().toLowerCase();

    if (!emailLower || !password) {
      return next(new ErrorHandler("Please provide email and password", 400));
    }

    const employee = await Employee.findOne({ email: emailLower }).select("+password");
    if (!employee) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }

    const isPasswordMatch = await employee.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }

    const access_token = generateToken(employee._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      access_token,
    });
  }
);

// Validate session
export const validateSession = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.employee?._id;

    if (!employeeId) {
      return next(new ErrorHandler("Unauthorized: Employee not found", 401));
    }

    const employee = await Employee.findById(employeeId)
      .populate({
        path: "contactInformation",
        select: "workPhone -_id",
      })
      .populate({
        path: "reportsTo",
        select: "name -_id avatar",
      })
      .populate({
        path: "department",
        select: "name -_id",
      })
      .select("employeeNumber workLocation avatar positionId jobTitle department reportsTo role email contactInformation status name");

    if (!employee) {
      return next(new ErrorHandler("Unauthorized: Employee not found", 401));
    }

    return res.status(200).json(employee);
  }
);

// Logout employee
export const logoutEmployee = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return next(new ErrorHandler(error instanceof Error ? error : "An error occurred", 500));
  }
};

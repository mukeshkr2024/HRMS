import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { Employee } from "../models/employee.model";
import { ErrorHandler } from "../utils/ErrorHandler";
import { generateToken } from "../utils/jwt";

export const LoginEmployee = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
      }

      const employee = await Employee.findOne({ email }).select("+password");
      if (!employee) {
        return next(new ErrorHandler("Invalid credentials", 401));
      }

      const isPasswordMatch = await employee.comparePassword(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid credentials", 401));
      }

      const access_token = generateToken(employee._id);

      res.cookie("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        sucess: true,
        message: "Login successful",
        access_token,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const validateSession = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeData = await req.employee;

      if (!employeeData) {
        return next(new ErrorHandler("No data found in the session", 401));
      }
      return res.status(200).json({
        employee: {
          _id: employeeData._id,
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          email: employeeData.email,
          role: employeeData.role,
          phone: employeeData.phone,
          jobTitle: employeeData.jobTitle,
          status: employeeData.status,
          employeeNumber: employeeData.employeeNumber,
        },
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const logoutEmployee = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    return next(new ErrorHandler(error, 500));
  }
};

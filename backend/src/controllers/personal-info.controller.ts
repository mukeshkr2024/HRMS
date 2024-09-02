import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import { PersonalInformation } from "../models/personal.information.model";

export const getEmployeePersonalInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = req.employee;

      if (!employee) {
        return next(new ErrorHandler("Employee not found", 404));
      }

      const info = await PersonalInformation.findOne({
        employeId: employee._id,
      });

      if (!info) {
        return next(
          new ErrorHandler("Employee Personal information not found", 404)
        );
      }

      return res.status(200).json({
        personal_info: info,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const updateEmployeePersonalInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const employee = await req.employee?.populate("personalInformation");

    console.log("Employee: ", employee);

    if (!employee) {
      return next(new ErrorHandler("Employee not found", 404));
    }

    const info = await PersonalInformation.findOneAndUpdate(
      {
        employeId: employee._id,
      },
      { $set: { ...req.body } },
      {
        new: true,
      }
    );

    if (!info) {
      return next(
        new ErrorHandler("Failed to update personal information", 400)
      );
    }

    return res.status(200).json({
      personal_info: info,
    });
  }
);

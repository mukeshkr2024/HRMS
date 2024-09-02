import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { Employee } from "../models/employee.model";
import { JobInformation } from "../models/job.information.model";
import { PersonalInformation } from "../models/personal.information.model";
import { ErrorHandler } from "../utils/ErrorHandler";

export const createEmployee = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = await Employee.create(req.body);

      const personalInfo = await PersonalInformation.create({
        employeId: employee._id,
      });

      const jobInfo = await JobInformation.create({
        employeId: employee._id,
      });

      console.log(personalInfo);
      console.log(jobInfo);

      // @ts-ignore
      employee.jobInformation = jobInfo._id;
      // @ts-ignore
      employee.personalInformation = personalInfo._id;

      await employee.save();

      return res.status(201).json({
        employee,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const getAllEmployees = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employees = await Employee.find();

      console.log(employees);

      return res.status(200).json({
        employees,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const getEmployeeById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = await Employee.findById(req.params.employeeId);

      if (!employee) {
        return next(new ErrorHandler("Employee not found", 404));
      }

      return res.status(200).json({
        employee,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const deleteEmployeeById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.employeeId);
      if (!employee) {
        return next(new ErrorHandler("Employee not found", 404));
      }
      return res.status(200).json({
        employee,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const updateEmployeeById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = await Employee.findByIdAndUpdate(
        req.params.employeeId,
        req.body,
        { new: true }
      );

      if (!employee) {
        return next(new ErrorHandler("Employee not found", 404));
      }

      return res.status(200).json({
        employee,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

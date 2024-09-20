import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import { Employee } from "../models/employee.model";

export const getMembers = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            const employeeId = req.employee.id;

            const employees = await Employee.find({
                reportsTo: employeeId
            }).select("name email avatar")

            return res.json(employees)
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)
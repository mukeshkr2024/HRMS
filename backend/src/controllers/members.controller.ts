import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import { Employee } from "../models/employee.model";
import { Issue } from "../models/issue.model";

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

export const updateMemberIssue = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const issueId = req.params.issueId;

        const { value } = req.body;

        const issue = await Issue.findByIdAndUpdate(issueId, {
            approval: value
        })

        if (!issue) {
            return next(new ErrorHandler("Issue not found", 400))
        }

        return res.status(200).json({
            message: "Issue status updated successfully"
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})
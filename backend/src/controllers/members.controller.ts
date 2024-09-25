import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import { Employee } from "../models/employee.model";
import { Issue } from "../models/issue.model";

export const getMembers = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employeeId = req.employee.id;
            const role = req.employee.role;

            console.log(role);

            let employees;

            if (role === "admin") {
                employees = await Employee.find();
            } else {
                employees = await Employee.find({
                    reportsTo: employeeId
                }).select("name email avatar")
            }

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

        if (!value) {
            return res.status(400).json({ message: "Approval status is required." });
        }

        const employee = req.employee;

        console.log(employee);

        let toUpdate;

        if (employee.role === "admin") {
            toUpdate = {
                status: value
            }
        } else {
            toUpdate = {
                approval: value,
            }
        }

        const issue = await Issue.findByIdAndUpdate(issueId, toUpdate)

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
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { Notification } from "../models/notifications.model";
import { ErrorHandler } from "../utils/ErrorHandler";

export const getfeedbackNotifications = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            const notifications = await Notification.find({
                employeeId: req.employee.id,
            }).populate({
                path: "createdBy",
                select: "name avatar"
            }).sort({
                createdAt: -1
            })

            return res.status(200).json({ notifications });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
);

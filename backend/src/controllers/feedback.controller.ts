import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import { Feedback } from "../models/feedback.model";
import { Notification } from "../models/notifications.model";
import { Employee } from "../models/employee.model";

const FEEDBACK_REQUEST_NOTIFICATION_TYPE = "feedback-request";

const calculateDueDate = (days: number): Date => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
    return currentDate;
};

export const requestFeedBack = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { giverId, receiverId } = req.body;

    // Validate if giverId and receiverId are present
    if (!giverId || !receiverId) {
        return next(new ErrorHandler("Feedback giver and receiver are required.", 400));
    }

    // Get authenticated user
    const authUser = await Employee.findById(req.employee.id);
    if (!authUser) {
        return next(new ErrorHandler("Authenticated user not found.", 404));
    }

    // Check if feedback receiver exists
    const feedbackReceiver = await Employee.findById(receiverId);
    if (!feedbackReceiver) {
        return next(new ErrorHandler("Feedback receiver not found.", 404));
    }

    // Create feedback
    const feedback = await Feedback.create({
        feedbackGiver: giverId,
        feedbackReceiver: receiverId,
        requestedBy: authUser._id,
        question1Response: "",
        question2Response: "",
        dueDate: calculateDueDate(15) // Calculate due date
    });

    if (!feedback) {
        return next(new ErrorHandler("Failed to create feedback request.", 500));
    }

    // Create notification
    const notification = await Notification.create({
        employeeId: giverId,
        notificationType: FEEDBACK_REQUEST_NOTIFICATION_TYPE,
        title: `Feedback Request from ${authUser.name}`,
        message: `Please give feedback to ${feedbackReceiver.name}`,
        redirectUrl: `/feedback/view/${feedback._id}`,
        createdBy: authUser._id
    });



    console.log("Notification Created:", {
        notificationId: notification._id,
        employeeId: giverId,
        notificationType: notification.notificationType,
        title: notification.title,
        message: notification.message,
    });

    return res.status(201).json({
        message: "Feedback request created successfully.",
        feedbackRequestId: feedback._id,
        notificationId: notification._id,
    });
});

export const getFeedbackById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { feedbackId } = req.params;

            const feedback = await Feedback.findById(feedbackId).populate({
                path: "feedbackReceiver",
                select: "name jobTitle avatar"
            })

            if (!feedback) {
                return next(new ErrorHandler("Feedback not found.", 404));
            }

            const notification = await Notification.findOneAndUpdate({
                employeeId: feedback.feedbackGiver,
                redirectUrl: `/feedback/view/${feedback._id}`,
                isRead: true
            });

            console.log(notification);


            return res.status(200).json(feedback)

        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)

export const submitFeedback = CatchAsyncError(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { feedbackId } = req.params;
    const { response1, response2 } = req.body;

    const feedback = await Feedback.findByIdAndUpdate(feedbackId, {
        question1Response: response1,
        question2Response: response2,
        submitted: true,
    }, { new: true });



    if (!feedback) {
        return next(new ErrorHandler("Feedback not found.", 404));
    }


    return res.status(200).json({ message: "Feedback submitted successfully." });
});

export const getMemberFeedbacks = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { memberId } = req.params;
            const { start, end, page = 1, limit = 10 } = req.query;

            let startDate: Date | null = null;
            let endDate: Date | null = null;

            if (start && end) {
                startDate = new Date(start as string);
                endDate = new Date(end as string);

                if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                    return res.status(400).json({ message: "Invalid date format." });
                }
            }

            // Create a date filter object
            const dateFilter: any = {};
            if (startDate) {
                dateFilter.$gte = startDate;
            }
            if (endDate) {
                dateFilter.$lte = endDate;
            }

            const skip = (page - 1) * limit; // Calculate the number of documents to skip
            const feedbacks = await Feedback.find({
                feedbackReceiver: memberId,
                submitted: true,
                ...(startDate || endDate ? { createdAt: dateFilter } : {}) // Apply date filter only if either date is provided
            }).populate({
                path: 'feedbackGiver',
                select: 'name avatar jobTitle'
            }).sort({ createdAt: -1 })
                .skip(skip) // Skip the previous pages
                .limit(Number(limit)); // Limit the number of documents returned

            const pendings = await Feedback.find({
                feedbackReceiver: memberId,
                submitted: false,
                ...(startDate || endDate ? { createdAt: dateFilter } : {})
            }).populate({
                path: 'feedbackGiver',
                select: 'name avatar jobTitle'
            });

            return res.json({
                pendings,
                feedbacks,
                page: Number(page),
                hasMore: feedbacks.length === Number(limit) // Check if there are more feedbacks to load
            });

        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
);


export const deleteFeedBackRequest = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { feedbackRequestId } = req.params;

    // Validate if feedbackRequestId is provided
    if (!feedbackRequestId) {
        return next(new ErrorHandler("Feedback request ID is required.", 400));
    }

    // Find the feedback request
    const feedback = await Feedback.findById(feedbackRequestId);
    if (!feedback) {
        return next(new ErrorHandler("Feedback request not found.", 404));
    }

    // Delete the feedback request
    await Feedback.findByIdAndDelete(feedbackRequestId);

    // Delete the associated notification
    const notification = await Notification.findOneAndDelete({
        employeeId: feedback.feedbackGiver,
        redirectUrl: `/feedback/view/${feedback._id}`
    });

    console.log("Notification Deleted:", {
        notificationId: notification ? notification._id : null,
        feedbackRequestId: feedback._id,
    });

    return res.status(200).json({
        message: "Feedback request and notification deleted successfully.",
    });
});

export const getMyMembersForFeedback = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            const employeeId = req.employee.id;
            const role = req.employee.role;

            console.log(employeeId);


            console.log(role);

            let employees;

            if (role === "admin") {
                employees = await Employee.find({
                    _id: { $ne: employeeId }
                });
            } else {
                employees = await Employee.find({
                    reportsTo: employeeId,
                    _id: { $ne: employeeId }
                }).select("name email avatar")
            }

            return res.json(employees)
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)
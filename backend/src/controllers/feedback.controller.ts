import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import { Feedback } from "../models/feedback.model";
import { Notification } from "../models/notifications.model";
import { Employee } from "../models/employee.model";

const FEEDBACK_REQUEST_NOTIFICATION_TYPE = "feedback-request";

// Utility function to calculate the due date
const calculateDueDate = (days: number): Date => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
    return currentDate;
};

// Request feedback from an employee
export const requestFeedback = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { giverId, receiverId } = req.body;

    if (!giverId || !receiverId) {
        return next(new ErrorHandler("Feedback giver and receiver are required.", 400));
    }

    const authUser = await Employee.findById(req.employee.id);
    if (!authUser) {
        return next(new ErrorHandler("Authenticated user not found.", 404));
    }

    const feedbackReceiver = await Employee.findById(receiverId);
    if (!feedbackReceiver) {
        return next(new ErrorHandler("Feedback receiver not found.", 404));
    }

    const feedback = await Feedback.create({
        feedbackGiver: giverId,
        feedbackReceiver: receiverId,
        requestedBy: authUser._id,
        question1Response: "",
        question2Response: "",
        dueDate: calculateDueDate(15),
    });

    if (!feedback) {
        return next(new ErrorHandler("Failed to create feedback request.", 500));
    }

    const notification = await Notification.create({
        employeeId: giverId,
        notificationType: FEEDBACK_REQUEST_NOTIFICATION_TYPE,
        title: `Feedback Request from ${authUser.name}`,
        message: `Please give feedback to ${feedbackReceiver.name}`,
        redirectUrl: `/feedback/view/${feedback._id}`,
        createdBy: authUser._id,
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

// Get feedback by its ID
export const getFeedbackById = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { feedbackId } = req.params;
    const { notification_id } = req.query;

    const feedback = await Feedback.findById(feedbackId).populate({
        path: "feedbackReceiver",
        select: "name jobTitle avatar",
    });

    if (!feedback) {
        return next(new ErrorHandler("Feedback not found.", 404));
    }

    const response = await Notification.findByIdAndUpdate(notification_id, {
        isRead: true,
    });

    console.log(response);

    return res.status(200).json(feedback);
});

// Submit feedback
export const submitFeedback = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { feedbackId } = req.params;
    const { response1, response2 } = req.body;

    const feedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        {
            question1Response: response1,
            question2Response: response2,
            submitted: true,
        },
        { new: true }
    );

    if (!feedback) {
        return next(new ErrorHandler("Feedback not found.", 404));
    }

    return res.status(200).json({ message: "Feedback submitted successfully." });
});

// Get feedbacks for a specific member
export const getMemberFeedbacks = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { memberId } = req.params;
    const { start, end, page = 1, limit = 10 } = req.query;

    let startDate: Date | null = start ? new Date(start as string) : null;
    let endDate: Date | null = end ? new Date(end as string) : null;

    if (startDate && isNaN(startDate.getTime()) || endDate && isNaN(endDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format." });
    }

    const dateFilter: Record<string, Date> = {};
    if (startDate) dateFilter.$gte = startDate;
    if (endDate) dateFilter.$lte = endDate;

    const skip = (Number(page) - 1) * Number(limit);

    const feedbacks = await Feedback.find({
        feedbackReceiver: memberId,
        submitted: true,
        ...(startDate || endDate ? { createdAt: dateFilter } : {}),
    })
        .populate("feedbackGiver", "name avatar jobTitle")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const pendings = await Feedback.find({
        feedbackReceiver: memberId,
        submitted: false,
        ...(startDate || endDate ? { createdAt: dateFilter } : {}),
    }).populate("feedbackGiver", "name avatar jobTitle");

    return res.json({
        pendings,
        feedbacks,
        page: Number(page),
        hasMore: feedbacks.length === Number(limit),
    });
});

// Delete feedback request
export const deleteFeedbackRequest = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { feedbackRequestId } = req.params;

    const feedback = await Feedback.findById(feedbackRequestId);
    if (!feedback) {
        return next(new ErrorHandler("Feedback request not found.", 404));
    }

    await Feedback.findByIdAndDelete(feedbackRequestId);

    const notification = await Notification.findOneAndDelete({
        employeeId: feedback.feedbackGiver,
        redirectUrl: `/feedback/view/${feedback._id}`,
    });

    console.log("Notification Deleted:", {
        notificationId: notification ? notification._id : null,
        feedbackRequestId: feedback._id,
    });

    return res.status(200).json({
        message: "Feedback request and notification deleted successfully.",
    });
});

// Get all employees for feedback, based on user role
export const getMyMembersForFeedback = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.employee.id;
    const role = req.employee.role;

    const query = role === "admin" ? { _id: { $ne: employeeId } } : { reportsTo: employeeId, _id: { $ne: employeeId } };

    const employees = await Employee.find(query).select("name email avatar");

    return res.json(employees);
});

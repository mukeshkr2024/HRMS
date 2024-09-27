import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import { Feedback } from "../models/feedback.model";

export const createFeedBack = CatchAsyncError(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            feedbackGiver,
            feedbackReceiver
        } = req.body;

        if (!feedbackGiver || !feedbackReceiver) {
            return res.status(400).json({ message: "Feedback giver and receiver are required." });
        }

        const feedback = await Feedback.create({
            feedbackGiver: feedbackGiver,
            feedbackReceiver: feedbackReceiver,
        })

        return res.status(201).json(feedback);
    } catch (error) {
        next(new ErrorHandler(error, 400));
    }
})

export const submitFeedback = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { feedbackId } = req.params;
            const {
                response1,
                response2,
            } = req.body;

            const feedback = await Feedback.findByIdAndUpdate(feedbackId, {
                question1Response: response1,
                question2Response: response2
            })

            if (!feedback) {
                return res.status(404).json({ message: "Feedback not found." });
            }

            return res.status(200).json({ message: "Feedback submitted successfully." });
        } catch (error) {
            next(new ErrorHandler(error, 400));
        }
    }
)


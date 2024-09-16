import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import { Goal } from "../models/goal.model";

export const createGoal = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                title,
                description,
                dueDate
            } = req.body;

            if (
                !title || !description || !dueDate
            ) {
                throw new ErrorHandler("All fields are required", 400);
            }

            const employeeId = req.employee.id

            await Goal.create({
                title,
                description,
                dueDate,
                createdBy: employeeId
            })

            return res.status(200).json({
                message: "Goal created successfully"
            })

        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)


export const getGoals = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            console.log("called", req.query);

            const { employee } = req.query;

            const employeeId = employee ? employee : req.employee.id;

            const goals = await Goal.find(
                {
                    createdBy: employeeId
                }
            ).sort({
                createdAt: -1
            }).select("title dueDate progress status")


            return res.status(200).json(
                goals
            )

        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)

export const getGoal = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            const employeeId = req.employee.id;
            const goalId = req.params.goalId;

            console.log(goalId);

            const goal = await Goal.findOne({
                createdBy: employeeId,
                _id: goalId,
            }).populate({
                path: "comments.addedBy",
                select: "name email avatar",
            })

            if (!goal) {

                throw new ErrorHandler("Goal not found", 404)
            }

            return res.status(200).json(goal)

        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)


export const addComment = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employeeId = req.employee.id;
            const goalId = req.params.goalId;

            const { title } = req.body;

            if (!title) {
                throw new ErrorHandler("Title is required", 400);
            }

            const goal = await Goal.findOneAndUpdate(
                { _id: goalId },
                {
                    $push: {
                        comments: {
                            title: title,
                            addedBy: employeeId,
                            createdAt: new Date(),
                        },
                    },
                },
                { new: true, runValidators: true }
            );

            if (!goal) {
                return next(new ErrorHandler("Goal not found", 404));
            }

            res.status(200).json({
                success: true,
                message: "Comment added successfully",
                goal,
            });

        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)

export const updateGoal = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { goalId } = req.params;

            console.log("Goal ID:", goalId);
            console.log("Request Body:", req.body);

            const updatedGoal = await Goal.findByIdAndUpdate(
                goalId,
                { $set: req.body },
                { new: true, runValidators: true }
            );

            if (!updatedGoal) {
                return next(new ErrorHandler("Goal not found", 404));
            }

            return res.status(200).json({
                message: "Goal updated successfully",
                goal: updatedGoal
            });

        } catch (error) {
            console.error("Error updating goal:", error);
            return next(new ErrorHandler("Failed to update goal", 400));
        }
    }
);





import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import { Task } from "../models/task.model";

export const createTask = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title } = req.body;

        if (!title) {
            return next(new ErrorHandler("Title is required", 400));
        }

        const task = await Task.create({
            title,
            employeeId: req.employee._id
        })

        return res.status(200).json({ task })
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})

export const getAllTasks = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const tasks = await Task.find({ employeeId: req.employee.id })
            .sort({ isDone: 1, createdAt: -1 })

        return res.status(200).json({ tasks })
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})

export const updateTask = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const task = await Task.findByIdAndUpdate(req.params.taskId, { $set: req.body }, { new: true })

        if (!task) {
            return next(new ErrorHandler("Task not found", 404));
        }
        return res.status(200).json({ task })
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})

export const deleteTask = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const task = await Task.findByIdAndDelete(req.params.taskId)
        if (!task) {
            return next(new ErrorHandler("Task not found", 404));
        }

        return res.status(200).json({
            message: "Task deleted successfully"
        })

    } catch (error) {
        return next(new ErrorHandler(error, 400));

    }
})
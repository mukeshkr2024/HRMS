import { NextFunction, Request, Response } from "express";
import { Training } from "../models/trainings.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";

export const createTraining = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, dateTime, location, trainer } = req.body;

      if (!title || !description || !dateTime || !location || !trainer) {
        return next(new ErrorHandler("All fields are required", 400));
      }

      const training = await Training.create({
        title,
        description,
        dateTime,
        location,
        trainer,
      });

      return res.status(201).json({
        training,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const getTrainings = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainings = await Training.find();

      return res.status(200).json({
        trainings,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const getTrainingById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const training = await Training.findById(req.params.id);

      if (!training) {
        return next(new ErrorHandler("Training not found", 404));
      }

      return res.status(200).json({
        training,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const updateTraining = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!training) {
        return next(new ErrorHandler("Training not found", 404));
      }

      return res.status(200).json({
        training,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const deleteTraining = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const training = await Training.findByIdAndDelete(req.params.id);

      if (!training) {
        return next(new ErrorHandler("Training not found", 404));
      }

      return res.status(200).json({
        message: "Training deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

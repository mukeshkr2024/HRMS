import { NextFunction, Request, Response } from "express";
import { TrainingParticipant } from "../models/trainingParticipants.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";

export const createTrainingParticipant = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { trainingId, employeeId } = req.body;

      if (!trainingId || !employeeId) {
        return next(new ErrorHandler("All fields are required", 400));
      }

      const trainingParticipant = await TrainingParticipant.create({
        trainingId,
        employeeId,
      });

      return res.status(201).json({
        trainingParticipant,
      });
    } catch (error) {
      console.error("Error creating training participant:", error);
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const getTrainingParticipants = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainingParticipants = await TrainingParticipant.find();

      if (!trainingParticipants) {
        return next(new ErrorHandler("No training participants found", 404));
      }

      return res.status(200).json({
        trainingParticipants,
      });
    } catch (error) {
      console.error("Error populating references:", error);
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const getTrainingParticipantById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainingParticipant = await TrainingParticipant.findById(req.params.id);

      if (!trainingParticipant) {
        return next(new ErrorHandler("Training Participant not found", 404));
      }

      return res.status(200).json({
        trainingParticipant,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const updateTrainingParticipant = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainingParticipant = await TrainingParticipant.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!trainingParticipant) {
        return next(new ErrorHandler("Training Participant not found", 404));
      }

      return res.status(200).json({
        trainingParticipant,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const deleteTrainingParticipant = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainingParticipant = await TrainingParticipant.findByIdAndDelete(
        req.params.id
      );

      if (!trainingParticipant) {
        return next(new ErrorHandler("Training Participant not found", 404));
      }

      return res.status(200).json({
        message: "Training Participant deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

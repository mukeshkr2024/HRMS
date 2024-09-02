import { NextFunction, Request, Response } from "express";
import { PerformanceReview } from "../models/performanceReviews.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";

export const createPerformanceReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employeeId, reviewDate, reviewerId, comments, rating } = req.body;

      if (!employeeId || !reviewDate || !reviewerId || !comments || !rating) {
        return next(new ErrorHandler("All fields are required", 400));
      }

      const performanceReview = await PerformanceReview.create({
        employeeId,
        reviewDate,
        reviewerId,
        comments,
        rating,
      });

      return res.status(201).json({
        performanceReview,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const getPerformanceReviews = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const performanceReviews = await PerformanceReview.find();

      return res.status(200).json({
        performanceReviews,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const getPerformanceReviewById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const performanceReview = await PerformanceReview.findById(req.params.id);

      if (!performanceReview) {
        return next(new ErrorHandler("Performance Review not found", 404));
      }

      return res.status(200).json({
        performanceReview,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const updatePerformanceReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const performanceReview = await PerformanceReview.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!performanceReview) {
        return next(new ErrorHandler("Performance Review not found", 404));
      }

      return res.status(200).json({
        performanceReview,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const deletePerformanceReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const performanceReview = await PerformanceReview.findByIdAndDelete(req.params.id);

      if (!performanceReview) {
        return next(new ErrorHandler("Performance Review not found", 404));
      }

      return res.status(200).json({
        message: "Performance Review deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

import { NextFunction, Request, Response } from "express";
import { Hierarchy } from "../models/hierarchy.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";

export const createHierarchy = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { managerId, subordinateId, effectiveDate } = req.body;

      if (!managerId || !subordinateId || !effectiveDate) {
        return next(new ErrorHandler("All fields are required", 400));
      }

      const hierarchy = await Hierarchy.create({
        managerId,
        subordinateId,
        effectiveDate,
      });

      return res.status(201).json({
        hierarchy,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const getHierarchies = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hierarchies = await Hierarchy.find();

      return res.status(200).json({
        hierarchies,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const getHierarchyById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hierarchy = await Hierarchy.findById(req.params.id);

      if (!hierarchy) {
        return next(new ErrorHandler("Hierarchy not found", 404));
      }

      return res.status(200).json({
        hierarchy,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const updateHierarchy = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hierarchy = await Hierarchy.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!hierarchy) {
        return next(new ErrorHandler("Hierarchy not found", 404));
      }

      return res.status(200).json({
        hierarchy,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const deleteHierarchy = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hierarchy = await Hierarchy.findByIdAndDelete(req.params.id);

      if (!hierarchy) {
        return next(new ErrorHandler("Hierarchy not found", 404));
      }

      return res.status(200).json({
        message: "Hierarchy deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import Announcement from "../models/announcements";

export const createAnnouncement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const announcement = new Announcement({
        createdBy: req.employee._id,
        description: req.body.description
      });
      await announcement.save();

      return res.status(201).json({
        announcement,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const getAllAnnouncements = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const announcements = await Announcement.find().sort({ createdAt: -1 }).populate({
        path: "createdBy",
        select: "name avatar"
      });
      return res.status(200).json({ announcements });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const getAnnouncementById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const announcement = await Announcement.findById(
        req.params.announcementId
      );

      if (!announcement) {
        return next(new ErrorHandler("Announcement not found", 404));
      }

      return res.status(200).json({ announcement });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const updateAnnouncement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const announcement = await Announcement.findByIdAndUpdate(
        req.params.announcementId,
        req.body,
        {
          new: true,
        }
      );

      if (!announcement) {
        return next(new ErrorHandler("Announcement not found", 404));
      }

      return res.status(200).json({ announcement });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const deleteAnnouncement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const announcement = await Announcement.findByIdAndDelete(
        req.params.announcementId
      );
      return res.status(200).json({ announcement });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

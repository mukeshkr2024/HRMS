import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import Announcement from "../models/announcements";
import { Notification } from "../models/notifications.model";

export const createAnnouncement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const announcement = new Announcement({
        createdBy: req.employee._id,
        description: req.body.description
      });
      await announcement.save();

      return res.status(201).json({
        message: "Announcement saved successfully"
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
      }).select("description createdBy");

      const notifications = await Notification.find({
        employeeId: req.employee.id,
        isRead: false
      }).populate({
        path: "createdBy",
        select: "name avatar"
      }).sort({
        createdAt: -1
      })

      return res.status(200).json({ announcements, notifications });
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
      return res.status(200).json({
        message: "Announcement deleted successfully"
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

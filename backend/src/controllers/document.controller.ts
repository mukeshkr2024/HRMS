import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { Folder } from "../models/folder.model";
import { ErrorHandler } from "../utils/ErrorHandler";
import { File } from "../models/file.model";

export const createFolder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { folderName, employeeId } = req.body;

      if (!folderName || !employeeId) {
        return next(new ErrorHandler("All fields are required", 400));
      }

      const folderExist = await Folder.findOne({
        name: folderName,
        employeeId: employeeId,
      });

      if (folderExist) {
        return next(new ErrorHandler("Folder already exist", 400));
      }

      const folder = await Folder.create({
        name: folderName,
        employeeId: employeeId,
      });

      return res.status(201).json({
        folder,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const uploadFile = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file as Express.Multer.File;

      if (!file) {
        throw new ErrorHandler("File is required", 400);
      }

      const { originalname, mimetype, size } = file;
      const { folderId } = req.body;
      const addedBy = req.employee._id;

      if (!folderId) {
        throw new ErrorHandler("Folder ID is required", 400);
      }

      const folder = await Folder.findById(folderId);

      if (!folder) {
        throw new ErrorHandler("Folder not found", 404);
      }

      const uploadedFile = await File.create({
        name: originalname,
        folderId: folder._id,
        addedBy: addedBy,
        fileType: mimetype,
        size,
      });

      return res.status(201).json({ uploadedFile });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);


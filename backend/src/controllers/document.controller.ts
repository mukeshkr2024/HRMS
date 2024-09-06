import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { File } from "../models/file.model";
import { Folder } from "../models/folder.model";
import { ErrorHandler } from "../utils/ErrorHandler";

export const createFolder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const employeeId = req.employee.id;
    const folderId = req.query.folderId as string | undefined; // Type assertion

    if (!name) {
      return next(new ErrorHandler("Folder name is required", 400));
    }

    try {
      const existingFolder = await Folder.findOne({
        name,
        employeeId,
        parentId: folderId || null
      });

      if (existingFolder) {
        return next(new ErrorHandler("Folder already exists", 400));
      }

      const newFolder = await Folder.create({
        name,
        employeeId,
        parentId: folderId || null
      });

      return res.status(201).json({ folder: newFolder });
    } catch (error) {
      return next(new ErrorHandler("Error creating folder", 500)); // More descriptive message
    }
  }
);

export const getAllDocuments = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.employee.id;
    const folderId = req.query.folderId as string | undefined;

    try {
      // Define filters for folders and files
      const folderFilter = { employeeId, parentId: folderId || null };
      const fileFilter = { addedBy: employeeId, folderId: folderId || null };

      // Fetch parent folder if folderId is provided
      let parentFolder = null;
      if (folderId) {
        parentFolder = await Folder.findById(folderId).populate("parentId")
        if (!parentFolder) {
          throw new Error("Folder not found");
        }
      }

      console.log(parentFolder);


      // Create the query for folders with optional population of parentId
      const foldersQuery = Folder.find(folderFilter);
      if (folderId) {
        foldersQuery.populate("parentId", "name"); // Populate parentId with name field
      }

      // Execute queries in parallel
      const [folders, files] = await Promise.all([
        foldersQuery,
        File.find(fileFilter)
      ]);

      // Send the response
      return res.status(200).json({
        documents: {
          folders,
          files,
          parentFolder
        }
      });
    } catch (error) {
      return next(new ErrorHandler("Error fetching documents", 500)); // More descriptive message
    }
  }
);

// Upload a file
export const uploadFile = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file as Express.Multer.File;
    const folderId = req.query.folderId as string | undefined; // Type assertion

    if (!file) {
      return next(new ErrorHandler("File is required", 400));
    }

    try {
      const { originalname, mimetype, size } = file;

      const uploadedFile = await File.create({
        name: originalname,
        fileType: mimetype,
        size,
        addedBy: req.employee._id,
        folderId: folderId || null
      });

      return res.status(201).json({ uploadedFile });
    } catch (error) {
      return next(new ErrorHandler("Error uploading file", 500)); // More descriptive message
    }
  }
);

import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { File } from "../models/file.model";
import { Folder } from "../models/folder.model";
import { ErrorHandler } from "../utils/ErrorHandler";
import { deleteFileFromS3, uploadFileToS3 } from "../utils/file-upload";

export const createFolder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const { folderId, employee } = req.query;
    const employeeId = employee ? employee : req.employee.id;

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
    const { folderId, employee } = req.query;
    const employeeId = employee ? employee : req.employee.id;

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

// upload file 
export const uploadFile = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file as Express.Multer.File;
    const { folderId, employee } = req.query;

    const employeeId = employee ? employee : req.employee._id

    if (!file) {
      return next(new ErrorHandler('File is required', 400));
    }

    try {
      const { originalname, mimetype, size } = file;

      // Upload file to S3
      const fileUrl = await uploadFileToS3({
        buffer: file.buffer,
        mimetype: mimetype,
      });

      const uploadedFile = await File.create({
        name: originalname,
        fileType: mimetype,
        size,
        addedBy: employeeId,
        folderId: folderId || null,
        url: fileUrl,
      });

      console.log("uploadedFile", uploadedFile);


      return res.status(201).json({ uploadedFile });
    } catch (error) {
      return next(new ErrorHandler('Error uploading file', 500));
    }
  }
);

export const deleteDocuments = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { files, folders } = req.body;

      if (files.length > 0) {
        // Fetch file documents including the 'url' field
        const filesToDelete = await File.find({ _id: { $in: files } }).select('folderId url fileType');
        const parentFolderIds = filesToDelete.map(file => file.folderId);

        const extractObjectIdFromUrl = (url: string): string | null => {
          const match = url.match(/\/([^\/]+)$/);
          return match ? match[1] : null;
        };

        // Delete files from S3 and handle potential errors
        await Promise.all(filesToDelete.map(async file => {
          const fileName = extractObjectIdFromUrl(file.url);
          if (fileName) {
            try {
              // TODO: remove from s3 as well
              await deleteFileFromS3(fileName, file.fileType);
            } catch (err) {
              console.error(`Failed to delete file with URL: ${file.url}`, err);
            }
          }
        }));

        if (parentFolderIds.length > 0) {
          await Folder.updateMany(
            { _id: { $in: parentFolderIds } },
            { $pull: { files: { $in: files } } }
          );
        }

        // Delete file records from the database
        await File.deleteMany({ _id: { $in: files } });
      }

      if (folders.length > 0) {
        // Delete files and folders from the database
        await File.deleteMany({ folderId: { $in: folders } });
        await Folder.deleteMany({ _id: { $in: folders } });
      }

      return res.status(200).json({ message: "Documents deleted successfully" });
    } catch (error) {
      return next(new ErrorHandler(error || 'Internal Server Error', 500));
    }
  }
);


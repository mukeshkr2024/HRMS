import express from "express";
import {
  createFolder,
  uploadFile,
} from "../../controllers/document.controller";
import { isAuthenticated } from "../../middleware/auth";
import { upload } from "../../utils/file-upload";

export const documentRouter = express.Router();

documentRouter.post("/folders", isAuthenticated, createFolder);
documentRouter.post(
  "/file",
  upload.single("file"),
  isAuthenticated,
  uploadFile
);

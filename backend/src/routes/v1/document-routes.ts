import express from "express";
import {
  createFolder,
  getAllDocuments,
  uploadFile,
} from "../../controllers/document.controller";
import { isAuthenticated } from "../../middleware/auth";
import { upload } from "../../utils/file-upload";

export const documentRouter = express.Router();

documentRouter.post("/folder/create", isAuthenticated, createFolder);
documentRouter.get("/", isAuthenticated, getAllDocuments)
documentRouter.post(
  "/file/upload",
  upload.single("file"),
  isAuthenticated,
  uploadFile
);

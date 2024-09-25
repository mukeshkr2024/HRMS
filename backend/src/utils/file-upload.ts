import multer from "multer";
import path from "path";

import crypto from 'crypto';
import { Readable } from 'stream';
import { ErrorHandler } from './ErrorHandler';
import { deleteFile, getObjectUrl, UploadFile } from "../config/s3";


const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });


// Generate a random file name
const generateFileName = (bytes: number = 32): string => crypto.randomBytes(bytes).toString('hex');

// Define types for file and options
interface File {
  buffer: Buffer | Readable;
  mimetype: string;
}

interface UploadOptions {
  [key: string]: any; // Adjust as needed for specific options
}

// Upload any file to S3
const uploadFileToS3 = async (file: File, type?: UploadOptions): Promise<string> => {
  if (!file) {
    throw new ErrorHandler('No file provided', 400);
  }

  const fileName = generateFileName();

  try {
    await UploadFile(file.buffer, fileName, file.mimetype, type);
    const fileUrl = await getObjectUrl(fileName, type);
    return fileUrl;
  } catch (error) {
    console.error('Failed to upload file:', error);
    throw new ErrorHandler('Failed to upload file', 500);
  }
};

// Delete any file from S3
const deleteFileFromS3 = async (fileName: string, type?: UploadOptions): Promise<boolean> => {
  if (!fileName) {
    throw new ErrorHandler('File name must be provided', 400);
  }
  try {
    await deleteFile(fileName, type);
    return true;
  } catch (error) {
    console.error('Failed to delete file:', error);
    throw new ErrorHandler('Failed to delete file', 500);
  }
};

export { uploadFileToS3, deleteFileFromS3 };

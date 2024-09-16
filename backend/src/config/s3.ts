import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    PutObjectCommandInput,
    DeleteObjectCommandInput,
    GetObjectCommandInput,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from "stream";

const bucket = process.env.AWS_BUCKET as string;
const region = process.env.AWS_REGION as string;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

// Define types for file upload options
interface UploadOptions {
    video?: boolean;
}

// Upload file function
async function UploadFile(
    fileBuffer: Buffer | Readable,
    fileName: string,
    mimetype: string,
    type: UploadOptions = {}
): Promise<void> {
    try {

        const uploadParams: PutObjectCommandInput = {
            Bucket: bucket,
            Body: fileBuffer,
            Key: fileName,
            ContentType: mimetype,
        };

        await s3Client.send(new PutObjectCommand(uploadParams));
    } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error(`File upload failed: ${error}`);
    }
}

// Get signed URL for the object
async function getObjectSignedUrl(
    fileName: string,
    type: UploadOptions = {}
): Promise<string> {
    try {
        const params: GetObjectCommandInput = {
            Bucket: bucket,
            Key: fileName,
        };

        const command = new GetObjectCommand(params);
        const expiresIn = 600000; // 10 minutes

        const url = await getSignedUrl(s3Client, command, { expiresIn });

        return url;
    } catch (error) {
        console.error("Error getting signed URL:", error);
        throw new Error(`Signed URL generation failed: ${error}`);
    }
}

// Get object URL directly
async function getObjectUrl(
    fileName: string,
    type: UploadOptions = {}
): Promise<string> {
    const objectUrl = `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;
    return objectUrl;
}

// Delete file function
async function deleteFile(fileName: string, type: UploadOptions = {}): Promise<void> {
    try {
        const deleteParams: DeleteObjectCommandInput = {
            Bucket: bucket,
            Key: fileName,
        };

        await s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
        console.error("Error deleting file:", error);
        throw new Error(`File deletion failed: ${error}`);
    }
}

export { UploadFile, getObjectSignedUrl, getObjectUrl, deleteFile };

import { Document, Model, model, Schema, Types } from "mongoose";

interface IFile extends Document {
  name: string;
  folderId: Types.ObjectId;
  addedBy: Types.ObjectId;
  fileType: string;
  size: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const fileSchema = new Schema<IFile>(
  {
    name: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    folderId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const File: Model<IFile> = model<IFile>("File", fileSchema);

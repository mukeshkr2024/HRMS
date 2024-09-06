import { Document, Model, model, Schema, Types } from "mongoose";

interface IFolder extends Document {
  name: string;
  employeeId: Types.ObjectId;
  parentId?: Types.ObjectId;
  files?: Types.ObjectId[];
}

const folderSchema = new Schema<IFolder>(
  {
    name: {
      type: String,
      required: true,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
    files: [{
      type: Schema.Types.ObjectId,
      ref: "File",
    }],
  },
  {
    timestamps: true,
  }
);

export const Folder: Model<IFolder> = model<IFolder>("Folder", folderSchema);

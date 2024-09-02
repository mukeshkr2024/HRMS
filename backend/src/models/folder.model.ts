import { Model, model, Schema, Types } from "mongoose";

interface IFolder extends Document {
  name: string;
  files: Types.ObjectId[];
  employeeId: Types.ObjectId;
}

const folderSchema = new Schema<IFolder>(
  {
    name: {
      type: String,
      required: true,
    },
    files: [
      {
        type: Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Folder: Model<IFolder> = model<IFolder>("Folder", folderSchema);

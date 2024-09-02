import { Model, model, Schema, Document } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  description: string;
}

const departmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 255,
      unique: true,  //
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Department: Model<IDepartment> = model<IDepartment>(
  "Department",
  departmentSchema
);

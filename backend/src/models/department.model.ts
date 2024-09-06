import { Model, model, Schema, Document } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  description: string;
  employees: Schema.Types.ObjectId[];  // Correct type for an array of ObjectIds
}

const departmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 255,
      unique: true,  // This is fine
    },
    description: {
      type: String,
      required: true,
    },
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Department: Model<IDepartment> = model<IDepartment>(
  "Department",
  departmentSchema
);

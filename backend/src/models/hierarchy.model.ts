import { model, Model, Schema, Document, Types } from "mongoose";

export interface IHierarchy extends Document {
  managerId: Types.ObjectId;
  subordinateId: Types.ObjectId;
  effectiveDate: Date;
}

const hierarchySchema = new Schema<IHierarchy>(
  {
    managerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    subordinateId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    effectiveDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Hierarchy: Model<IHierarchy> = model<IHierarchy>(
  "Hierarchy",
  hierarchySchema
);

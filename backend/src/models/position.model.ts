import { Model, model, Schema, Document } from "mongoose";

export interface IPosition extends Document {
  name: string;
  description: string;
  employees: Schema.Types.ObjectId[];
  createdAt: Date;
}

const positionSchema = new Schema<IPosition>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 255,
    },
    description: {
      type: String,
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

export const Position: Model<IPosition> = model<IPosition>(
  "Position",
  positionSchema
);

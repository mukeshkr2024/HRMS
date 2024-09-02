import { Model, model, Schema, Document } from "mongoose";

export interface IPosition extends Document {
  title: string;
  description: string;
}

const positionSchema = new Schema<IPosition>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255,
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

export const Position: Model<IPosition> = model<IPosition>(
  "Position",
  positionSchema
);

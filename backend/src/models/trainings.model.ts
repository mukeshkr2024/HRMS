import { model, Model, Schema, Document } from "mongoose";

export interface ITraining extends Document {
  title: string;
  description: string;
  dateTime: Date;
  location: string;
  trainer: string;
}

const trainingSchema = new Schema<ITraining>(
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
    dateTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      maxlength: 255,
    },
    trainer: {
      type: String,
      required: true,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  }
);

export const Training: Model<ITraining> = model<ITraining>(
  "Training",
  trainingSchema
);

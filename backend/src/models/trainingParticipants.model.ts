import { model, Model, Schema, Document, Types } from "mongoose";

export interface ITrainingParticipant extends Document {
  trainingId: Types.ObjectId;
  employeeId: Types.ObjectId;
}

const trainingParticipantSchema = new Schema<ITrainingParticipant>(
  {
    trainingId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Training",
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

export const TrainingParticipant: Model<ITrainingParticipant> =
  model<ITrainingParticipant>("TrainingParticipant", trainingParticipantSchema);

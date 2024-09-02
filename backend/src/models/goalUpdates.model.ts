import { model, Model, Schema, Document, Types } from "mongoose";

export interface IGoalUpdate extends Document {
  goalId: Types.ObjectId;
  updateDate: Date;
  comments: string;
  status: string;
}

const goalUpdateSchema = new Schema<IGoalUpdate>(
  {
    goalId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Goal",
    },
    updateDate: {
      type: Date,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  }
);

export const GoalUpdate: Model<IGoalUpdate> = model<IGoalUpdate>(
  "GoalUpdate",
  goalUpdateSchema
);

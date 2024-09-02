import { model, Model, Schema, Document, Types } from "mongoose";

export interface IGoalVisibility extends Document {
  goalId: Types.ObjectId;
  employeeId: Types.ObjectId;
}

const goalVisibilitySchema = new Schema<IGoalVisibility>(
  {
    goalId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Goal",
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

export const GoalVisibility: Model<IGoalVisibility> = model<IGoalVisibility>(
  "GoalVisibility",
  goalVisibilitySchema
);

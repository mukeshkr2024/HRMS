import { model, Model, Schema, Document, Types } from "mongoose";

export interface IPerformanceReview extends Document {
  employeeId: Types.ObjectId;
  reviewDate: Date;
  reviewerId: Types.ObjectId;
  comments: string;
  rating: number;
}

const performanceReviewSchema = new Schema<IPerformanceReview>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    reviewDate: {
      type: Date,
      required: true,
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    comments: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: (value: number) => value >= 1 && value <= 5,
        message: "Rating should be between 1 and 5",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const PerformanceReview: Model<IPerformanceReview> =
  model<IPerformanceReview>("PerformanceReview", performanceReviewSchema);

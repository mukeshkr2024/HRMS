import { model, Model, Schema, Document, Types } from "mongoose";

export interface ILeave extends Document {
  employeeId: Types.ObjectId;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: string;
  managerApprovalStatus: string;
}

const leaveSchema = new Schema<ILeave>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    leaveType: {
      type: String,
      required: true,
      maxlength: 50,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      maxlength: 50,
    },
    managerApprovalStatus: {
      type: String,
      required: true,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  }
);

export const Leave: Model<ILeave> = model<ILeave>("Leave", leaveSchema);

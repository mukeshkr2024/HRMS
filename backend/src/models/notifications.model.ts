import { Document, model, Model, Schema, Types } from "mongoose";

export interface INotification extends Document {
  employeeId: Types.ObjectId;
  notificationType: string;
  message: string;
  title?: string;
  isRead: boolean;
  redirectUrl?: string;
  createdBy: Types.ObjectId;
}

const notificationSchema = new Schema<INotification>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    notificationType: {
      type: String,
      required: true,
      maxlength: 50,
    },
    title: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    redirectUrl: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    }
  },
  {
    timestamps: true,
  }
);

export const Notification: Model<INotification> = model<INotification>(
  "Notification",
  notificationSchema
);

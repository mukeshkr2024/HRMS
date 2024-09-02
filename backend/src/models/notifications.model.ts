import { model, Model, Schema, Document, Types } from "mongoose";

export interface INotification extends Document {
  employeeId: Types.ObjectId;
  notificationType: string;
  message: string;
  isRead: boolean;
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
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification: Model<INotification> = model<INotification>(
  "Notification",
  notificationSchema
);

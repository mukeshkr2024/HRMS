import { Types } from "mongoose";

export interface INotification extends Document {
    employeeId: Types.ObjectId;
    notificationType: string;
    message?: string;
    isRead: boolean;
    redirectUrl?: string;
}
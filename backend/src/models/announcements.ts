import { model, Schema, Types, Document, Model } from "mongoose";

export interface IAnnouncements extends Document {
  title: string;
  description: string;
  createdBy: Types.ObjectId;
  audience: "All" | "Department" | "Position" | "Individual";
  departmentId?: Types.ObjectId;
  positionId?: Types.ObjectId;
  employeeIds?: Types.ObjectId[];
  startDate: Date;
  endDate: Date;
}

const announcementSchema = new Schema<IAnnouncements>(
  {
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    startDate: {
      type: Date,
      // required: true,
    },
    endDate: {
      type: Date,
      // required: true,
    },
    audience: {
      type: String,
      enum: ["All", "Department", "Position", "Individual"],
      default: "All",
      // required: true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: function () {
        return this.audience === "Department";
      },
    },
    positionId: {
      type: Schema.Types.ObjectId,
      ref: "Position",
      required: function () {
        return this.audience === "Position";
      },
    },
    employeeIds: {
      type: [Schema.Types.ObjectId],
      ref: "Employee",
      required: function () {
        return this.audience === "Individual";
      },
    },
  },
  {
    timestamps: true,
  }
);

const Announcement: Model<IAnnouncements> = model<IAnnouncements>(
  "Announcement",
  announcementSchema
);

export default Announcement;

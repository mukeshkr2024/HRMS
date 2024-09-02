import { Schema, Model, model } from "mongoose";

interface IJobInformation {
  employeeId: Schema.Types.ObjectId;
  hireDate?: Date;
  category?: "salesforce" | "full-stack" | "marketing";
  employmentStatus?: {
    date?: Date;
    status?: "full-time" | "part-time" | "contract";
    comment?: string;
  };
  compensation?: {
    date?: Date;
    payType?: "hourly" | "weekly" | "bi-weekly" | "monthly";
    payRate?: number;
    comment?: string;
  };
  information?: {
    date?: Date;
    location?: "patna" | "pune" | "ranchi";
    department?: Schema.Types.ObjectId;
    division?: string;
    jobTitle?: string;
    reportsTo?: Schema.Types.ObjectId;
  };
}

const jobInformationSchema = new Schema<IJobInformation>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    category: {
      type: String,
      enum: ["salesforce", "full-stack", "marketing"],
      default: "salesforce",
    },
    employmentStatus: {
      date: { type: Date },
      status: {
        type: String,
        enum: ["full-time", "part-time", "contract"],
      },
      comment: { type: String },
    },
    compensation: {
      date: { type: Date },
      payType: {
        type: String,
        enum: ["hourly", "weekly", "bi-weekly", "monthly"],
      },
      payRate: { type: Number },
      comment: { type: String },
    },
    information: {
      date: { type: Date },
      location: {
        type: String,
        enum: ["patna", "pune", "ranchi"],
      },
      department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
      },
      division: { type: String },
      jobTitle: { type: String },
      reportsTo: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const JobInformation: Model<IJobInformation> = model<IJobInformation>(
  "JobInformation",
  jobInformationSchema
);

import { model, Model, Schema } from "mongoose";

interface IPersonalInformation extends Document {
  employeId: Schema.Types.ObjectId;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth?: Date;
  employmentStatus?: "active" | "inactive" | "on-leave";
  gender?: "Male" | "Female" | "Other";
  maritalStatus?: "Single" | "Married";
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  workPhone?: string;
  mobilePhone?: string;
  homePhone?: string;
  workEmail?: string;
  homeEmail?: string;
  linkedIn?: string;
  facebook?: string;
  twitter?: string;
  education?: {
    college?: string;
    degree?: string;
    specialization?: string;
    gpa?: number;
    startDate?: Date;
    endDate?: Date;
  }[];
}

const personalInformationSchema = new Schema(
  {
    employeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married"],
    },
    street1: { type: String },
    street2: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
    workPhone: { type: String },
    mobilePhone: { type: String },
    homePhone: { type: String },
    workEmail: { type: String },
    homeEmail: { type: String },
    linkedIn: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    education: [
      {
        college: { type: String },
        degree: { type: String },
        specialization: { type: String },
        gpa: { type: Number },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const PersonalInformation: Model<IPersonalInformation> =
  model<IPersonalInformation>("PersonalInformation", personalInformationSchema);

import { Document, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const saltRounds = 10;

export interface IEmployee extends Document {
  personalInformation: Schema.Types.ObjectId;
  address: Schema.Types.ObjectId;
  compensation: Schema.Types.ObjectId;
  contactInformation: Schema.Types.ObjectId;
  password: string;
  status: string;
  employeeNumber: string;
  hireDate: Date;
  department: Schema.Types.ObjectId;
  position: Schema.Types.ObjectId;
  jobTitle: string;
  reportsTo: Schema.Types.ObjectId;
  role: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
  email: string;
  educations: {
    college: string;
    degree: string;
    specialization: string;
    gpa: string;
    startDate: Date;
    endDate: Date;
  }[];
  languages: string[];
  name: string;
  avatar: string;
  workLocation: string;
  linkedinUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  facebookUrl: string
}

const employeeSchema = new Schema<IEmployee>(
  {
    employeeNumber: { type: String, unique: true },
    name: { type: String, required: true },
    hireDate: { type: Date },
    department: { type: Schema.Types.ObjectId, ref: "Department" },
    position: { type: Schema.Types.ObjectId, ref: "Position" },
    jobTitle: { type: String, required: true },
    reportsTo: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    role: { type: String, enum: ["admin", "employee", "manager", "lead"], default: "employee" },
    email: {
      type: String,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    personalInformation: { type: Schema.Types.ObjectId, ref: "PersonalInformation", required: true },
    address: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    compensation: { type: Schema.Types.ObjectId, ref: "Compensation" },
    contactInformation: { type: Schema.Types.ObjectId, ref: "ContactInformation" },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive", "on-leave", "terminated"], default: "active" },
    avatar: { type: String },
    workLocation: { type: String }, // Todo: add later
    educations: [
      {
        college: { type: String },
        degree: { type: String },
        specialization: { type: String },
        gpa: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    languages: [{ type: String }],
    linkedinUrl: {
      type: String
    },
    twitterUrl: {
      type: String
    },
    instagramUrl: {
      type: String
    },
    facebookUrl: {
      type: String
    }
  },
  { timestamps: true }
);

// Hash password before saving
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, saltRounds);
  return next();
});

// compare password
employeeSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const Employee = model<IEmployee>("Employee", employeeSchema);

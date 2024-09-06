import bcrypt from "bcryptjs";
import { Document, Schema, model } from "mongoose";

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
  departmentId: Schema.Types.ObjectId;
  positionId: Schema.Types.ObjectId;
  jobTitle: string;
  reportsTo: string;
  role: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
  email: string;
  educations: Schema.Types.ObjectId[];
  languages: string[];
}

const employeeSchema = new Schema<IEmployee>(
  {

    employeeNumber: { type: String, unique: true },
    hireDate: { type: Date },
    departmentId: { type: Schema.Types.ObjectId, ref: "Department" },
    positionId: { type: Schema.Types.ObjectId, ref: "Position" },
    jobTitle: { type: String, required: true },
    reportsTo: { type: String, required: true },
    role: { type: String, enum: ["admin", "hr", "employee", "manager"], default: "employee" },
    email: {
      type: String,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    personalInformation: { type: Schema.Types.ObjectId, ref: "PersonalInformation", required: true },
    address: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    compensation: { type: Schema.Types.ObjectId, ref: "Compensation" },
    contactInformation: { type: Schema.Types.ObjectId, ref: "ContactInformation" },
    password: { type: String, required: true, select: false },
    status: { type: String, enum: ["active", "inactive", "on-leave"], default: "active" },
    educations: [
      {
        type: [Schema.Types.ObjectId],
        ref: "Education"
      }
    ],
    languages: [
      {
        type: String,
      }
    ]
  },
  { timestamps: true }
);

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hash = await bcrypt.hash(this.password, saltRounds);
  this.password = hash;
  next();
});

employeeSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

export const Employee = model<IEmployee>("Employee", employeeSchema);

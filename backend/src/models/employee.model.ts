import bcrypt from "bcryptjs";
import { Document, model, Model, Schema } from "mongoose";

const saltRounds = 10;

export interface IEmployee extends Document {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;
  status: "active" | "inactive" | "on-leave";
  email: string;
  phone: string;
  employeeNumber: string;
  hireDate?: Date;
  departmentId: Schema.Types.ObjectId;
  positionId: Schema.Types.ObjectId;
  managerId: Schema.Types.ObjectId;
  employmentStatus: "active" | "inactive" | "on-leave";
  salary: number;
  bonus: number;
  commission: number;
  jobTitle: string;
  password: string;
  role: "admin" | "hr" | "employee" | "manager";
  createdAt: Date;
  updatedAt: Date;
  personalInformation: Schema.Types.ObjectId;
  jobInformation: Schema.Types.ObjectId;
  profilePic?: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const employeeSchema = new Schema<IEmployee>(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    dateOfBirth: { type: Date },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    phone: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive", "on-leave"],
      default: "active",
    },
    employeeNumber: { type: String, unique: true },
    hireDate: { type: Date },//
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    profilePic: {
      type: String,
    },
    positionId: {
      type: Schema.Types.ObjectId,
      ref: "Position",
    },
    jobTitle: { type: String },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      required: true,
      enum: ["admin", "hr", "employee", "manager"],
      default: "employee",
    },
    personalInformation: {
      type: Schema.Types.ObjectId,
      ref: "PersonalInformation",
    },
    jobInformation: {
      type: Schema.Types.ObjectId,
      ref: "JobInformation",
    },

  },
  { timestamps: true }
);

employeeSchema.index({ email: 1 }, { unique: true });
employeeSchema.index({ employeeNumber: 1 }, { unique: true });

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, saltRounds);
  console.log(`Password hashed for ${this.email} at ${new Date()}`);
  return next();
});

employeeSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const Employee: Model<IEmployee> = model<IEmployee>(
  "Employee",
  employeeSchema
);

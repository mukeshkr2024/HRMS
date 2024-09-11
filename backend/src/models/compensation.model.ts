import { Document, model, Schema } from "mongoose";

export interface ICompensation extends Document {
    paySchedule: string;
    payType: string;
    payRate: number;
    payRateType: string;
    salary?: number;
    bonus?: number;
    commission?: number;
}

const compensationSchema = new Schema<ICompensation>({
    paySchedule: { type: String, required: true },
    payType: { type: String, required: true },
    payRate: { type: Number, required: true },
    payRateType: { type: String, enum: ["hourly", "salary", "commission", "other", "fixed"], required: true },
    salary: { type: Number },
    bonus: { type: Number },
    commission: { type: Number },
});

export const Compensation = model<ICompensation>("Compensation", compensationSchema);

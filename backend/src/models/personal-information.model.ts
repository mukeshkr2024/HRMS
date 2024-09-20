import { Document, Schema, model } from "mongoose";

export interface IPersonalInformation extends Document {
    firstName: string;
    middleName?: string;
    lastName: string;
    preferredName?: string;
    dateOfBirth: Date;
    gender: string;
    maritalStatus: string;
    uan: string;
    pan: string;
}

const personalInformationSchema = new Schema<IPersonalInformation>(
    {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
        preferredName: { type: String },
        dateOfBirth: { type: Date, required: true },
        gender: { type: String, required: true },
        maritalStatus: { type: String, required: true },
        uan: { type: String },
        pan: { type: String }
    },
);

export const PersonalInformation = model<IPersonalInformation>(
    "PersonalInformation",
    personalInformationSchema
);

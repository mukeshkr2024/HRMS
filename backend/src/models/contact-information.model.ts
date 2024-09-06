import { Document, model, Schema } from "mongoose";

export interface IContactInformation extends Document {
    workPhone: string;
    mobilePhone?: string;
    homePhone?: string;
    workEmail: string;
    homeEmail?: string;
}

const contactInformationSchema = new Schema<IContactInformation>({
    workPhone: { type: String, required: true },
    mobilePhone: { type: String },
    homePhone: { type: String },
    workEmail: { type: String, required: true },
    homeEmail: { type: String },
});

export const ContactInformation = model<IContactInformation>("ContactInformation", contactInformationSchema);

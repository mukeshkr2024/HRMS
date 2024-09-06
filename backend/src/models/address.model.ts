import { Document, Schema, model } from "mongoose";

interface IAddress extends Document {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

const addressSchema = new Schema<IAddress>({
    street1: { type: String, required: true },
    street2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true, length: 5 },
    country: { type: String, required: true },
});

export const Address = model<IAddress>("Address", addressSchema);

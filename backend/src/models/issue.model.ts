import { Document, Model, model, Schema, Types } from "mongoose";

interface IIssue extends Document {
    title: string;
    description: string;
    employeeId: Types.ObjectId;
    status: "pending" | "resolved";
    approval: "pending" | "approved";
}

const issueSchema = new Schema<IIssue>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        employeeId: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "resolved"],
        },
        approval: {
            type: String,
            default: "pending",
            enum: ["pending", "approved"],
        },
    },
    {
        timestamps: true,
    }
);

export const Issue: Model<IIssue> = model<IIssue>("Issue", issueSchema);

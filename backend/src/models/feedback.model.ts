import { Schema, model, Model, Document, Types } from "mongoose";

export interface IFeedback extends Document {
    feedbackGiver: Types.ObjectId;
    feedbackReceiver: Types.ObjectId;
    question1Response?: string;
    question2Response?: string;
    submitted: boolean;
    requestedBy: Types.ObjectId;
    dueDate: Date;
}

const feedbackSchema = new Schema<IFeedback>(
    {
        feedbackGiver: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Employee",
        },
        feedbackReceiver: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Employee",
        },
        question1Response: {
            type: String,
        },
        question2Response: {
            type: String,
        },
        submitted: {
            type: Boolean,
            default: false,
        },
        requestedBy: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Feedback: Model<IFeedback> = model<IFeedback>("Feedback", feedbackSchema);

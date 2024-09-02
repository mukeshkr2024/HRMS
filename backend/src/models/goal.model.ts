import { Document, Model, model, Schema, Types } from "mongoose";

export interface IGoal extends Document {
    title: string;
    description: string;
    createdBy: Types.ObjectId;
    dueDate: Date;
    completed: boolean;
    comments: IComment[];
    progress: number;
    status: "pending" | "in-progress" | "completed";
}

export interface IComment extends Document {
    title: string;
    addedBy: Types.ObjectId;
}

const commentSchema = new Schema<IComment>({
    title: {
        type: String,
        required: true,
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
}, {
    _id: false
});

const goalSchema = new Schema<IGoal>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    progress: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
    },
    comments: [commentSchema],
}, {
    timestamps: true,
});

export const Goal: Model<IGoal> = model<IGoal>("Goal", goalSchema);

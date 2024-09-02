import { model, Model, Schema, Types } from "mongoose";

export interface ITask extends Document {
    title: string;
    employeeId: Types.ObjectId;
    isDone?: boolean;
}

const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true
    },

    employeeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    },
    isDone: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const Task: Model<ITask> = model<ITask>("Task", taskSchema)
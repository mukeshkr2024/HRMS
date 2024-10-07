import mongoose, { Document, Schema, Model, model } from 'mongoose';

interface IAssessmentData extends Document {
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    isCompleted: boolean;
}

const assessmentDataSchema: Schema<IAssessmentData> = new Schema({
    answer1: { type: String },
    answer2: { type: String },
    answer3: { type: String },
    answer4: { type: String },
    isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

const AssessmentData: Model<IAssessmentData> = model<IAssessmentData>('AssessmentData', assessmentDataSchema);

interface IAssessment extends Document {
    name: string;
    employee: mongoose.Types.ObjectId;
    selfAssessment: mongoose.Types.ObjectId;
    managerAssessment: mongoose.Types.ObjectId;
    isCompleted: boolean;
}

const assessmentSchema: Schema<IAssessment> = new Schema({
    name: {
        type: String,
        required: true,
    },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    selfAssessment: { type: mongoose.Schema.Types.ObjectId, ref: 'AssessmentData', required: true },
    managerAssessment: { type: mongoose.Schema.Types.ObjectId, ref: 'AssessmentData', required: true },
    isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

const Assessment: Model<IAssessment> = model<IAssessment>('Assessment', assessmentSchema);

export { AssessmentData, Assessment };

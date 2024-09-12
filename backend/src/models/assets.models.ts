import {
    model,
    Model,
    Schema,
    Document as MongooseDocument,
    Types,
} from "mongoose";

export interface IAsset extends MongooseDocument {
    employeeId: Types.ObjectId;
    name: string;
    description: string;
    assignedAt: Date;
    addedBy: Types.ObjectId;
    serialNo: string;
}

const assetSchema = new Schema<IAsset>(
    {
        employeeId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Employee",
        },
        name: {
            type: String,
            required: true,
            maxlength: 255,
        },
        description: {
            type: String,
            required: true,
            maxlength: 1000,
        },
        serialNo: {
            type: String,
            maxlength: 50,
        },
        assignedAt: {
            type: Date,
            required: true,
        },
        addedBy: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Employee",
        },
    },
    {
        timestamps: true,
    }
);

export const Asset: Model<IAsset> = model<IAsset>(
    "Asset",
    assetSchema
);

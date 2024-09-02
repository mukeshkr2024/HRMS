import {
  model,
  Model,
  Schema,
  Document as MongooseDocument,
  Types,
} from "mongoose";

export interface IDocument extends MongooseDocument {
  employeeId: Types.ObjectId;
  documentName: string;
  documentType: string;
  uploadDate: Date;
  permissions: string;
}

const documentSchema = new Schema<IDocument>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    documentName: {
      type: String,
      required: true,
      maxlength: 255,
    },
    documentType: {
      type: String,
      required: true,
      maxlength: 50,
    },
    uploadDate: {
      type: Date,
      required: true,
    },
    permissions: {
      type: String,
      required: true,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  }
);

export const Document: Model<IDocument> = model<IDocument>(
  "Document",
  documentSchema
);

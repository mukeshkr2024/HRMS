import { Types } from "mongoose";

export const isValidObjectId = (id: unknown): boolean => {
    // Check if the id is a string and a valid ObjectId
    return typeof id === 'string' && Types.ObjectId.isValid(id);
};
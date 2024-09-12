import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import { Asset } from "../models/assets.models";

export const addAsset = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { category, description, serialno, assignedDate } = req.body;

        const trimmedCategory = category.trim();
        const trimmedDescription = description.trim();
        const trimmedSerialno = serialno.trim();

        if (!category || !description || !assignedDate) {
            throw new ErrorHandler('All fields are required', 400);
        }

        const authEmployeeId = req.employee.id

        if (!authEmployeeId) {
            throw new ErrorHandler('Unauthorized access', 401);
        }

        const asset = await Asset.create({
            employeeId: authEmployeeId,
            name: trimmedCategory,
            description: trimmedDescription,
            serialNo: trimmedSerialno,
            assignedAt: new Date(assignedDate),
            addedBy: authEmployeeId
        })

        console.log(asset);

        return res.status(200).json({
            message: 'Asset added successfully',
            asset
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})

export const getAssets = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const emloyeeId = req.employee.id;
        const assets = await Asset.find({
            employeeId: emloyeeId,
        })
        return res.status(200).json(assets)
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})
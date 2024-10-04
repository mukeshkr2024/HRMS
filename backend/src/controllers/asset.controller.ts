import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { Asset } from "../models/assets.models";
import { Issue } from "../models/issue.model";
import { ErrorHandler } from "../utils/ErrorHandler";

export const addAsset = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category, description, serialno, assignedDate } = req.body;
        const { employee } = req.query;
        const employeeId = employee ? employee : req.employee._id;

        const trimmedCategory = category.trim();
        const trimmedDescription = description.trim();
        const trimmedSerialno = serialno.trim();

        if (!category || !description || !assignedDate) {
            throw new ErrorHandler('All fields are required', 400);
        }

        const authEmployeeId = req.employee._id

        if (!employeeId) {
            throw new ErrorHandler('Unauthorized access', 401);
        }

        const asset = await Asset.create({
            employeeId: employeeId,
            name: trimmedCategory,
            description: trimmedDescription,
            serialNo: trimmedSerialno,
            assignedAt: new Date(assignedDate),
            addedBy: authEmployeeId
        })

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

        const { employee } = req.query;
        const employeeId = employee ? employee : req.employee._id;

        const assets = await Asset.find({
            employeeId: employeeId,
        })
        return res.status(200).json(assets)
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})

export const updateAsset = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { category, description, serialno, assignedDate } = req.body;
            const { employee } = req.query;
            const employeeId = employee ? employee : req.employee._id;

            const trimmedCategory = category.trim();
            const trimmedDescription = description.trim();
            const trimmedSerialno = serialno.trim();

            if (!category || !description || !assignedDate) {
                throw new ErrorHandler('All fields are required', 400);
            }
            const assetId = req.params.assetId;

            const sesset = await Asset.findByIdAndUpdate(assetId, {
                name: trimmedCategory,
                description: trimmedDescription,
                serialNo: trimmedSerialno,
                assignedAt: new Date(assignedDate),
            })

            return res.status(200).json({
                message: 'Asset updated successfully',
            })
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)

export const deleteAsset = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { assetId } = req.params;
            const asset = await Asset.findByIdAndDelete(assetId);
            if (!asset) {
                throw new ErrorHandler("Asset not found", 404);
            }
            return res.status(200).json({
                message: "Asset deleted successfully"
            })

        } catch (error) {
            return next(new ErrorHandler(error, 400));

        }
    }
)

export const createAssetIssue = CatchAsyncError(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        const issue = await Issue.create({
            title,
            description,
            employeeId: req.employee.id
        })

        return res.status(201).json(issue);
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})

export const getIssues = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { employee } = req.query;
        const employeeId = employee ? employee : req.employee.id
        try {
            const issues = await Issue.find({
                employeeId: employeeId,
            });
            return res.status(200).json(issues);
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)

export const updateIssue = CatchAsyncError(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const issueId = req.params.id;

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        const issue = await Issue.findByIdAndUpdate(issueId, {
            title,
            description,
        })

        return res.status(201).json(issue);
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})

export const deleteIssue = CatchAsyncError(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const issueId = req.params.id;

        await Issue.findByIdAndDelete(issueId)

        return res.status(201).json({
            message: "Issue deleted successfully"
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})
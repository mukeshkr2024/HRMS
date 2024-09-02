import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { Department } from "../models/department.model";
import { ErrorHandler } from "../utils/ErrorHandler";


export const createDepartment = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, description } = req.body;
            if (!name || !description) {
                return next(new ErrorHandler("All fields are required", 400));
            }

            const departmentExist = await Department.findOne({ name });
            if (departmentExist) {
                return next(new ErrorHandler("Department already exist", 400));
            }

            const department = await Department.create({
                name: name,
                description: description
            });
            return res.status(201).json({
                department,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
);


export const getAllDepartments = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const departments = await Department.find();
            return res.status(200).json({
                departments,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)

export const getdepartmentById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const department = await Department.findById(req.params.departmentId);

            if (!department) {
                return next(new ErrorHandler("Department not found", 404));
            }
            return res.status(200).json({
                department,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
);

export const deleteDepartmentById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const department = await Department.findByIdAndDelete(req.params.departmentId);
            if (!department) {
                return next(new ErrorHandler("Department not found", 404));
            }
            return res.status(200).json({
                department,
            });
        } catch (error) {

            return next(new ErrorHandler(error, 400));
        }
    }
);

export const updateDepartmentById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {

        try {
            const department = await Department.findByIdAndUpdate(
                req.params.departmentId,
                req.body,
                { new: true }
            );
            if (!department) {
                return next(new ErrorHandler("Department not found", 404));
            }
            return res.status(200).json({
                department,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
);
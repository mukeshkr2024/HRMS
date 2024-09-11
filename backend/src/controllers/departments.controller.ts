import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { Department } from "../models/department.model";
import { ErrorHandler } from "../utils/ErrorHandler";


export const createDepartment = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, description } = req.body;

            const isAlreadyExists = await Department.findOne({
                name: name
            })

            if (isAlreadyExists) {
                throw new ErrorHandler(`Department ${name} already exists`, 400)
            }

            const department = await Department.create({
                name: name,
                description: description
            })

            console.log(department);

            res.status(201).json(department)

        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
);

export const getAllDepartments = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const departments = await Department.find()
            const formattedDepartments = departments.map((department) => {
                return {
                    _id: department._id,
                    name: department.name,
                    description: department.description,
                    employees: department.employees.length
                }
            })
            return res.status(200).json(formattedDepartments)
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)

export const deleteDepartment = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const departmentId = await req.params.departmentId;
            const department = await Department.findByIdAndDelete(departmentId);
            if (!department) {
                throw new ErrorHandler("Department not found", 404);
            }
            return res.status(200).json({
                message: "Department deleted successfully"
            })
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { ErrorHandler } from "../utils/ErrorHandler";
import { Position } from "../models/position.model";


export const createPosition = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, description } = req.body;

            const isAlreadyExists = await Position.findOne({
                name: name
            })

            if (isAlreadyExists) {
                throw new ErrorHandler(`Profile ${name} already exists`, 400)
            }

            const position = await Position.create({
                name: name,
                description: description
            })


            res.status(201).json(position)

        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
);

export const getAllPositions = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const positions = await Position.find()
            const formattedPositions = positions.map((department) => {
                return {
                    _id: department._id,
                    name: department.name,
                    description: department.description,
                    employees: department.employees.length,
                    createdAt: department?.createdAt
                }
            })
            return res.status(200).json(formattedPositions)
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)

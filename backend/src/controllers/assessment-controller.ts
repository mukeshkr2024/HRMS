import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { Assessment, AssessmentData } from "../models/assessment.model";
import { ErrorHandler } from "../utils/ErrorHandler";

export const getAllAssessments = CatchAsyncError(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const { memberId } = req.query;

            const employeeId = memberId ? memberId : req.employee.id;

            const assessments = await Assessment.find({
                employee: employeeId
            }).populate("selfAssessment").populate("managerAssessment")

            return res.status(200).json(assessments)

        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)

export const getAssessmentById = CatchAsyncError(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const { assessmentId } = req.params;
            const assessment = await Assessment.findById(assessmentId).populate("selfAssessment").populate("managerAssessment")

            if (!assessment) {
                return next(new ErrorHandler("Assessment not found", 404));
            }

            return res.status(200).json(assessment)
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)

export const updateAssessment = CatchAsyncError(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const { assessmentDataId } = req.params;

            console.log(req.body);

            const {
                answer1,
                answer2,
                answer3,
                answer4

            } = req.body

            const updateAssessmentData = await AssessmentData.findByIdAndUpdate(
                assessmentDataId,
                {
                    answer1,
                    answer2,
                    answer3,
                    answer4,
                    isCompleted: true
                },
                {
                    new: true,
                    runValidators: true,
                }
            )

            if (!updateAssessmentData) {
                return next(new ErrorHandler("Assessment Data not found", 404));
            }

            return res.status(200).json({
                message: "Assessment updated successfully",
            })

        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    }
)
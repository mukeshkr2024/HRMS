import express from "express";
import { getAllAssessments, getAssessmentById, updateAssessment } from "../../controllers/assessment-controller";
import { isAuthenticated } from "../../middleware/auth";

export const assessmentRouter = express.Router();

assessmentRouter.get("/", isAuthenticated, getAllAssessments)
assessmentRouter.get("/:assessmentId", isAuthenticated, getAssessmentById)
assessmentRouter.put("/:assessmentDataId", isAuthenticated, updateAssessment)
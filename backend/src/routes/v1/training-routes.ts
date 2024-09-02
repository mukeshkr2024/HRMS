import express from "express";
import {
  createTraining,
  getTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining,
} from "../../controllers/trainings.controller";
import { isAuthenticated } from "../../middleware/auth";

export const trainingRouter = express.Router();

trainingRouter.post("/", isAuthenticated, createTraining);
trainingRouter.get("/", isAuthenticated, getTrainings);
trainingRouter.get("/:id", isAuthenticated, getTrainingById);
trainingRouter.put("/:id", isAuthenticated, updateTraining);
trainingRouter.delete("/:id", isAuthenticated, deleteTraining);

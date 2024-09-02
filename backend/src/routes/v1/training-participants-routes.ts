import express from "express";
import {
  createTrainingParticipant,
  getTrainingParticipants,
  getTrainingParticipantById,
  updateTrainingParticipant,
  deleteTrainingParticipant,
} from "../../controllers/training-participants.controller";
import { isAuthenticated } from "../../middleware/auth";

export const trainingParticipantRouter = express.Router();

trainingParticipantRouter.post("/", isAuthenticated, createTrainingParticipant);
trainingParticipantRouter.get("/", isAuthenticated, getTrainingParticipants);
trainingParticipantRouter.get("/:id", isAuthenticated, getTrainingParticipantById);
trainingParticipantRouter.put("/:id", isAuthenticated, updateTrainingParticipant);
trainingParticipantRouter.delete("/:id", isAuthenticated, deleteTrainingParticipant);

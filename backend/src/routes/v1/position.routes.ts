import express from "express";
import { createPosition, getAllPositions } from "../../controllers/positon.controller";
import { isAuthenticated } from "../../middleware/auth";

export const positionRouter = express.Router();

positionRouter.post(
    "/create",
    isAuthenticated,
    createPosition
);
positionRouter.get("/", isAuthenticated, getAllPositions)
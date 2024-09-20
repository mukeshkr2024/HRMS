import express from "express";
import { getMembers } from "../../controllers/members.controller";
import { isAuthenticated } from "../../middleware/auth";

export const memberRouter = express.Router();

memberRouter.get("/", isAuthenticated, getMembers)

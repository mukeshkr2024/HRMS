import express from "express";
import { getMembers, updateMemberIssue } from "../../controllers/members.controller";
import { isAuthenticated } from "../../middleware/auth";

export const memberRouter = express.Router();

memberRouter.get("/", isAuthenticated, getMembers)
memberRouter.put("/issues/:issueId", isAuthenticated, updateMemberIssue)


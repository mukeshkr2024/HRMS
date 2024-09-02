
import express from 'express';
import { addComment, createGoal, getGoal, getGoals } from '../../controllers/goal.controller';
import { isAuthenticated } from '../../middleware/auth';
export const goalRouter = express.Router();

goalRouter.post("/", isAuthenticated, createGoal)
goalRouter.get("/", isAuthenticated, getGoals)
goalRouter.get("/:goalId", isAuthenticated, getGoal)
goalRouter.post("/comment/:goalId", isAuthenticated, addComment)



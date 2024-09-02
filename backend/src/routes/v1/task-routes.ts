import express from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "../../controllers/task.controller";
import { isAuthenticated } from "../../middleware/auth";

export const taskRouter = express.Router();

taskRouter.post("/", isAuthenticated, createTask);
taskRouter.get("/", isAuthenticated, getAllTasks)
taskRouter.put("/:taskId", isAuthenticated, updateTask);
taskRouter.delete("/:taskId", isAuthenticated, deleteTask)
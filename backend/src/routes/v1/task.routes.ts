import express from "express";
import {
    createTask,
    deleteTask,
    getAllTasks,
    updateTask,
} from "../../controllers/task.controller";
import { isAuthenticated } from "../../middleware/auth";

export const taskRouter = express.Router();

// Create a new task
taskRouter.post("/", isAuthenticated, createTask);

// Get all tasks
taskRouter.get("/", isAuthenticated, getAllTasks);

// Update a task by ID
taskRouter.put("/:taskId", isAuthenticated, updateTask);

// Delete a task by ID
taskRouter.delete("/:taskId", isAuthenticated, deleteTask);

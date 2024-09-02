import express from "express";
import {
  createHierarchy,
  getHierarchies,
  getHierarchyById,
  updateHierarchy,
  deleteHierarchy,
} from "../../controllers/hierarchy.controller";
import { isAuthenticated } from "../../middleware/auth";

export const hierarchyRouter = express.Router();

hierarchyRouter.post("/", isAuthenticated, createHierarchy);
hierarchyRouter.get("/", isAuthenticated, getHierarchies);
hierarchyRouter.get("/:id", isAuthenticated, getHierarchyById);
hierarchyRouter.put("/:id", isAuthenticated, updateHierarchy);
hierarchyRouter.delete("/:id", isAuthenticated, deleteHierarchy);

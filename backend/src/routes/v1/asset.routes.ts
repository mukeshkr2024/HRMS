import express from "express";
import { addAsset, createAssetIssue, deleteIssue, getAssets, getIssues, updateIssue } from "../../controllers/asset.controller";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth";

export const assetRouter = express.Router();

assetRouter.post('/add', isAuthenticated, authorizeRoles("admin"), addAsset)
assetRouter.get('/', isAuthenticated, getAssets)
assetRouter.post("/issues", isAuthenticated, createAssetIssue)
assetRouter.get("/issues", isAuthenticated, getIssues)
assetRouter.put("/issues/:id", isAuthenticated, updateIssue)
assetRouter.delete("/issues/:id", isAuthenticated, deleteIssue)
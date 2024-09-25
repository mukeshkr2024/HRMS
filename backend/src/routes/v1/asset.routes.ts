import express from "express";
import { addAsset, createAssetIssue, deleteAsset, deleteIssue, getAssets, getIssues, updateAsset, updateIssue } from "../../controllers/asset.controller";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth";

export const assetRouter = express.Router();

assetRouter.post('/add', isAuthenticated, authorizeRoles("admin"), addAsset)
assetRouter.get('/', isAuthenticated, getAssets)
assetRouter.put("/:assetId", isAuthenticated, authorizeRoles('admin'), updateAsset)
assetRouter.delete("/:assetId", isAuthenticated, authorizeRoles('admin'), deleteAsset)
assetRouter.post("/issues", isAuthenticated, createAssetIssue)
assetRouter.get("/issues", isAuthenticated, getIssues)
assetRouter.put("/issues/:id", isAuthenticated, updateIssue)
assetRouter.delete("/issues/:id", isAuthenticated, deleteIssue)
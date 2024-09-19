import express from "express";
import { addAsset, createAssetIssue, getAssets, getIssues } from "../../controllers/asset.controller";
import { isAuthenticated } from "../../middleware/auth";

export const assetRouter = express.Router();

assetRouter.post('/add', isAuthenticated, addAsset)
assetRouter.get('/', isAuthenticated, getAssets)
assetRouter.post("/issues", isAuthenticated, createAssetIssue)
assetRouter.get("/issues", isAuthenticated, getIssues)
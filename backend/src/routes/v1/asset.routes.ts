import express from "express";
import { addAsset, getAssets } from "../../controllers/asset.controller";
import { isAuthenticated } from "../../middleware/auth";

export const assetRouter = express.Router();

assetRouter.post('/add', isAuthenticated, addAsset)
assetRouter.get('/', isAuthenticated, getAssets)
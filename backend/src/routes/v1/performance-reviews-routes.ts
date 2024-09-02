import express from "express";
import {
  createPerformanceReview,
  deletePerformanceReview,
  getPerformanceReviewById,
  getPerformanceReviews,
  updatePerformanceReview,
} from "../../controllers/performance-reviews.controller";
import { isAuthenticated } from "../../middleware/auth";

export const performanceReviewRouter = express.Router();

performanceReviewRouter.post("/", isAuthenticated, createPerformanceReview);
performanceReviewRouter.get("/", isAuthenticated, getPerformanceReviews);
performanceReviewRouter.get("/:id", isAuthenticated, getPerformanceReviewById);
performanceReviewRouter.put("/:id", isAuthenticated, updatePerformanceReview);
performanceReviewRouter.delete("/:id", isAuthenticated, deletePerformanceReview);

import express from "express";
import { employeeRouter } from "./v1/employee.routes";
import { authRouter } from "./v1/auth.routes";
import { documentRouter } from "./v1/document-routes";
import { hierarchyRouter } from "./v1/hierarchy-routes";
import { performanceReviewRouter } from "./v1/performance-reviews-routes";
import { trainingParticipantRouter } from "./v1/training-participants-routes";
import { trainingRouter } from "./v1/training-routes";
import { departmentRouter } from "./v1/departments.routes";
import { announcementRouter } from "./v1/announcement.routes";
import { taskRouter } from "./v1/task.routes";
import { goalRouter } from "./v1/goal.routes";
import { positionRouter } from "./v1/position.routes";
import { assetRouter } from "./v1/asset.routes";
import { memberRouter } from "./v1/members.routes";
import { feedBackRouter } from "./v1/feedback.routes";
import { notificationRouter } from "./v1/notification.routes";

export const router = express.Router();

// Employee routes
router.use("/employees", employeeRouter);

// Authentication routes
router.use("/auth", authRouter);

// Document routes
router.use("/documents", documentRouter);

// Hierarchy routes
router.use("/hierarchy", hierarchyRouter);

// Performance review routes
router.use("/performance", performanceReviewRouter);

// Training participants routes
router.use("/trainingparticipant", trainingParticipantRouter);

// Training routes
router.use("/training", trainingRouter);

// Department routes
router.use("/departments", departmentRouter);

// Position routes
router.use("/profiles", positionRouter);

// Goal routes
router.use("/employee/goals", goalRouter);

// Announcement routes
router.use("/announcements", announcementRouter);

// Task routes
router.use("/tasks", taskRouter);

// Asset routes 
router.use("/assets", assetRouter);

// Member routes
router.use("/members", memberRouter);

// feedback routes
router.use("/feedbacks", feedBackRouter)

// notifications routes
router.use("/notifications", notificationRouter)

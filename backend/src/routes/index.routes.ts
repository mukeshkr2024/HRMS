import express from "express";
import { employeeRouter } from "./v1/employee.routes";
import { authRouter } from "./v1/auth-routes";
import { documentRouter } from "./v1/document-routes";
import { hierarchyRouter } from "./v1/hierarchy-routes";
import { performanceReviewRouter } from "./v1/performance-reviews-routes";
import { trainingParticipantRouter } from "./v1/training-participants-routes";
import { trainingRouter } from "./v1/training-routes";
import { departmentRouter } from "./v1/departments.routes";
import { announcementRouter } from "./v1/announcement-routes";
import { taskRouter } from "./v1/task-routes";
import { goalRouter } from "./v1/goal.routes";

export const router = express.Router();

// employees routes
router.use("/employees", employeeRouter);
// auth routes
router.use("/auth", authRouter);
// document routes
router.use("/documents", documentRouter);
// hierarchy routes
router.use("/hierarchy", hierarchyRouter);
// performance routes
router.use("/performance", performanceReviewRouter);
// trainingParticipants routes
router.use("/trainingparticipant", trainingParticipantRouter);
// training routes
router.use("/training", trainingRouter);
// department routes
router.use("/departments", departmentRouter);
// goal routes
router.use("/employee/goals", goalRouter);
// announcement routes
router.use("/announcements", announcementRouter);
// tasks routes
router.use("/tasks", taskRouter)

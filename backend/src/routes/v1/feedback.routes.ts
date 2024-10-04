import express from 'express';
import { deleteFeedbackRequest, getFeedbackById, getMemberFeedbacks, requestFeedback, submitFeedback, getMyMembersForFeedback } from '../../controllers/feedback.controller';
import { getMembers } from '../../controllers/members.controller';
import { isAuthenticated } from '../../middleware/auth';
export const feedBackRouter = express.Router();

feedBackRouter.post("/", isAuthenticated, requestFeedback)
feedBackRouter.get("/members", isAuthenticated, getMyMembersForFeedback)
feedBackRouter.get("/member/:memberId", isAuthenticated, getMemberFeedbacks)
feedBackRouter.delete("/:feedbackRequestId", isAuthenticated, deleteFeedbackRequest)
feedBackRouter.put("/submit/:feedbackId", isAuthenticated, submitFeedback)
feedBackRouter.get("/:feedbackId", isAuthenticated, getFeedbackById)

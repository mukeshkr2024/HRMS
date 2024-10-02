import express from 'express';
import { deleteFeedBackRequest, getFeedbackById, getMemberFeedbacks, requestFeedBack, submitFeedback, getMyMembersForFeedback } from '../../controllers/feedback.controller';
import { getMembers } from '../../controllers/members.controller';
import { isAuthenticated } from '../../middleware/auth';
export const feedBackRouter = express.Router();

feedBackRouter.post("/", isAuthenticated, requestFeedBack)
feedBackRouter.get("/members", isAuthenticated, getMyMembersForFeedback)
feedBackRouter.get("/member/:memberId", isAuthenticated, getMemberFeedbacks)
feedBackRouter.delete("/:feedbackRequestId", isAuthenticated, deleteFeedBackRequest)
feedBackRouter.put("/submit/:feedbackId", isAuthenticated, submitFeedback)
feedBackRouter.get("/:feedbackId", isAuthenticated, getFeedbackById)

import express from 'express';
import { getfeedbackNotifications } from '../../controllers/notification.controller';
import { isAuthenticated } from '../../middleware/auth';
export const notificationRouter = express.Router();

notificationRouter.get("/feedbacks", isAuthenticated, getfeedbackNotifications)
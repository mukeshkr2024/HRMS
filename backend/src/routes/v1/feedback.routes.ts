import express from 'express';
import { createFeedBack } from '../../controllers/feedback.controller';
const feedBackRouter = express.Router();

feedBackRouter.post("/", createFeedBack)
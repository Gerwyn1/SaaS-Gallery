import express from "express";
const router = express.Router();
import * as feedbackController from '../controllers/feedback.js';
import {rateLimiter} from '../middleware/rateLimiter.js';
import {validate} from '../validation/feedback.js'

router
  .route("/")
  .post(rateLimiter, validate, feedbackController.feedback);

export default router;
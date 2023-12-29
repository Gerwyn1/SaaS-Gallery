import express from "express";
const router = express.Router();
import * as feedbackController from '../controllers/feedback.js';
import {rateLimiter} from '../middleware/rateLimiter.js';
import feedbackValidation from '../validation/feedback.js'

router
  .route("/")
  .post(rateLimiter, feedbackValidation, feedbackController.feedback);

module.exports = router;
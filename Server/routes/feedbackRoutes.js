import express from "express";
import { createFeedback } from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to submit feedback, protected to ensure authenticated users
router.post("/", protect, createFeedback);

export default router;

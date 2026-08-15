import express from "express";
import {
  getDashboardStats,
  getPendingPolicies,
  getPendingSchemes,
  getRecentActivity,
  submitReview,
} from "../controllers/volunteerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All volunteer routes require authentication
router.use(protect);

router.get("/dashboard", getDashboardStats);
router.get("/reviews/policies", getPendingPolicies);
router.get("/reviews/schemes", getPendingSchemes);
router.get("/reviews/recent", getRecentActivity);
router.post("/reviews/:type/:id", submitReview);

export default router;

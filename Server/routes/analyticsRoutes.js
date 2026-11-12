import { Router } from "express";
import { getAnalytics } from "../controllers/analyticsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", protect, admin, asyncHandler(getAnalytics));

export default router;

import { Router } from "express";
import { getNotificationsList } from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();
router.get("/", protect, asyncHandler(getNotificationsList));
export default router;
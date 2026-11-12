import { Router } from "express";
import {
  getNotificationsList,
  markAllNotificationsReadController,
  deleteNotificationController,
  getAdminNotificationsList,
  markAllAdminNotificationsReadController,
  deleteAdminNotificationController,
} from "../controllers/notificationController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

// Citizen routes
router.get("/", protect, asyncHandler(getNotificationsList));
router.patch("/read-all", protect, asyncHandler(markAllNotificationsReadController));
router.delete("/:id", protect, asyncHandler(deleteNotificationController));

// Admin routes — must come BEFORE "/:id" to avoid param collision
router.get("/admin", protect, admin, asyncHandler(getAdminNotificationsList));
router.patch("/admin/read-all", protect, admin, asyncHandler(markAllAdminNotificationsReadController));
router.delete("/admin/:id", protect, admin, asyncHandler(deleteAdminNotificationController));

export default router;
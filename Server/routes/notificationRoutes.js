import { Router } from "express";
import { getNotificationsList } from "../controllers/notificationController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();
router.get("/", asyncHandler(getNotificationsList));
export default router;
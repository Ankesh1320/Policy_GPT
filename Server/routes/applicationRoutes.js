import { Router } from "express";
import { getApplicationsList } from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();
router.get("/", protect, asyncHandler(getApplicationsList));
export default router;
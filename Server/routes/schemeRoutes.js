import { Router } from "express";
import { getSchemes } from "../controllers/schemeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();
router.get("/", protect, asyncHandler(getSchemes));
export default router;
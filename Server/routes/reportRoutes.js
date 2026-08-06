import { Router } from "express";
import { generateReport } from "../controllers/reportController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.post("/generate", protect, admin, asyncHandler(generateReport));

export default router;

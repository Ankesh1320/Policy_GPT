import { Router } from "express";
import { generateReport, getReportHistory, downloadReportById } from "../controllers/reportController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.post("/generate", protect, admin, asyncHandler(generateReport));
router.get("/", protect, admin, asyncHandler(getReportHistory));
router.get("/download/:id", protect, admin, asyncHandler(downloadReportById));

export default router;

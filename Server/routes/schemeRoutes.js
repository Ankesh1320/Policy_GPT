import { Router } from "express";
import {
  getSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme,
} from "../controllers/schemeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", protect, asyncHandler(getSchemes));
router.get("/:id", protect, asyncHandler(getSchemeById));
router.post("/", protect, admin, asyncHandler(createScheme));
router.put("/:id", protect, admin, asyncHandler(updateScheme));
router.delete("/:id", protect, admin, asyncHandler(deleteScheme));

export default router;
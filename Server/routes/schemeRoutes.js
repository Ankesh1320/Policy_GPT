import { Router } from "express";
import {
  getSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme,
  saveScheme,
  unsaveScheme,
  isSchemeSaved,
  addSearchHistory,
} from "../controllers/schemeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", protect, asyncHandler(getSchemes));
router.get("/:id", protect, asyncHandler(getSchemeById));
router.post("/", protect, admin, asyncHandler(createScheme));
router.put("/:id", protect, admin, asyncHandler(updateScheme));
router.delete("/:id", protect, admin, asyncHandler(deleteScheme));

// Saved Schemes routes
router.post("/:id/save", protect, asyncHandler(saveScheme));
router.delete("/:id/save", protect, asyncHandler(unsaveScheme));
router.get("/:id/is-saved", protect, asyncHandler(isSchemeSaved));

// Search History routes
router.post("/search-history", protect, asyncHandler(addSearchHistory));

export default router;
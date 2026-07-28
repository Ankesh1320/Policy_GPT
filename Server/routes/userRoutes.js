import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", protect, asyncHandler(getUser));

export default router;
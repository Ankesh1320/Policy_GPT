import { Router } from "express";
import { getSchemes } from "../controllers/schemeController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();
router.get("/", asyncHandler(getSchemes));
export default router;
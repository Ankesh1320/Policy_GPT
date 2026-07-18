import { Router } from "express";
import { getApplicationsList } from "../controllers/applicationController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();
router.get("/", asyncHandler(getApplicationsList));
export default router;
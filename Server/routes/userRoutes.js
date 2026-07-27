import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(getUser));

export default router;
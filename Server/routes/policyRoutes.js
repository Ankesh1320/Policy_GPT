import { Router } from "express";
import {
  getPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
} from "../controllers/policyController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", protect, asyncHandler(getPolicies));
router.get("/:id", protect, asyncHandler(getPolicyById));
router.post("/", protect, admin, asyncHandler(createPolicy));
router.put("/:id", protect, admin, asyncHandler(updatePolicy));
router.delete("/:id", protect, admin, asyncHandler(deletePolicy));

export default router;

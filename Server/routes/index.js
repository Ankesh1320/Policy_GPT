import { Router } from "express";
import dashboardRoutes from "./dashboardRoutes.js";
import userRoutes from "./userRoutes.js";
import schemeRoutes from "./schemeRoutes.js";
import policyRoutes from "./policyRoutes.js";
import applicationRoutes from "./applicationRoutes.js";
import notificationRoutes from "./notificationRoutes.js";
import reportRoutes from "./reportRoutes.js";

const router = Router();

router.use("/dashboard", dashboardRoutes);
router.use("/user", userRoutes);
router.use("/schemes", schemeRoutes);
router.use("/policies", policyRoutes);
router.use("/applications", applicationRoutes);
router.use("/notifications", notificationRoutes);
router.use("/reports", reportRoutes);


export default router;
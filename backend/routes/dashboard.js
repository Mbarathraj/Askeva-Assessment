import { Router } from "express";
import { getDashboard } from "../controller/dashboardController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", authMiddleware, getDashboard);

export const dashboardRoutes = router
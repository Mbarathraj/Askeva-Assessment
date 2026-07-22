import { Router } from "express";
import { getProfile, login, logout } from "../controller/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, getProfile);
export const authRoutes = router;

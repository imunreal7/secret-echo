// src/routes/auth.routes.ts
import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();
router.post("/signup", asyncHandler(signup));
router.post("/login", asyncHandler(login));
router.post("/logout", asyncHandler(login));

export default router;


// src/routes/auth.routes.ts
import { Router } from "express";
import { signup, login } from "../controllers/auth.controller";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();
router.post("/signup", asyncHandler(signup));
router.post("/login", asyncHandler(login));

export default router;


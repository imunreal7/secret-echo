// src/routes/chat.routes.ts
import { Router } from "express";
import { getChatHistory, postMessage } from "../controllers/chat.controller";
import { authGuard } from "../middleware/authGuard";

const router = Router();
router.use(authGuard);
router.get("/:roomId", getChatHistory);
router.post("/", postMessage);

export default router;


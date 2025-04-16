import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/authGuard";
import Message, { IMessage } from "../models/Message";
import aiService from "../services/ai.service";
import { getIo } from "../config/socket";

export async function getChatHistory(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const roomId = req.params.roomId;
        const messages = await Message.find({ roomId }).sort("createdAt");
        res.json(messages);
    } catch (err) {
        next(err);
    }
}

export async function postMessage(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const { roomId, content } = req.body;
        const userId = req.userId!;
        // Save user message
        const userMsg = await Message.create({ sender: userId, roomId, content });
        // Emit user message
        getIo().to(roomId).emit("message", userMsg);
        res.status(201).json(userMsg);

        // Simulate AI reply
        setTimeout(async () => {
            const replyContent = aiService.getReply(content);
            const aiMsg = await Message.create({ sender: null, roomId, content: replyContent });
            getIo().to(roomId).emit("message", aiMsg);
        }, 1500);
    } catch (err) {
        next(err);
    }
}


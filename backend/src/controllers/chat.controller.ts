import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/authGuard";
import Message, { IMessage } from "../models/Message";
import aiService from "../services/ai.service";

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
        res.status(201).json(userMsg);

        // Simulate AI reply
        setTimeout(async () => {
            const replyContent = aiService.getReply(content);
            await Message.create({ sender: null, roomId, content: replyContent });
            // Emit via Socket.io (we’ll integrate in next phase)
        }, 1500);
    } catch (err) {
        next(err);
    }
}


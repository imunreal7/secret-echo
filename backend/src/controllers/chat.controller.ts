// src/controllers/chat.controller.ts
import { RequestHandler } from "express";
import Message from "../models/Message";
import aiService from "../services/ai.service";
import { getIo } from "../config/socket";

export const getChatHistory: RequestHandler = async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        const messages = await Message.find({ roomId }).sort("createdAt");
        res.json(messages);
    } catch (err) {
        next(err);
    }
};

export const postMessage: RequestHandler = async (req, res, next) => {
    try {
        const { roomId, content } = req.body;
        // Since we extended Request in our codebase to include 'userId',
        // we typecast here. (Alternatively, you could attach a custom type to req.)
        const userId = (req as any).userId;
        // Save user message
        const userMsg = await Message.create({ sender: userId, roomId, content });
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
};


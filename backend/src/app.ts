import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorHandler";
import chatRoutes from "./routes/chat.routes";
import authRoutes from "./routes/auth.routes";
import rateLimit from "express-rate-limit";

const app = express();
app.use(cors());
app.use(json());

// Basic rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: "Too many requests, please try again later." },
});
app.use(limiter);

// connect to Mongo
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);

// error handler
app.use(errorHandler);

export default app;


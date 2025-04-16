import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(cors());
app.use(json());

// connect to Mongo
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);

// error handler
app.use(errorHandler);

export default app;


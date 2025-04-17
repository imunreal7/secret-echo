import mongoose from "mongoose";
import { MONGO_URI } from "./env";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/secretecho");
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
};


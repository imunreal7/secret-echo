import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT || 4000;
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/secretecho";
export const JWT_SECRET = process.env.JWT_SECRET || "my_jwt_secret";


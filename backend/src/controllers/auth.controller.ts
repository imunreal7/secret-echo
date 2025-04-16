import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { JWT_SECRET } from "../config/env";

export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: "User created" });
    } catch (err) {
        next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        next(err);
    }
}


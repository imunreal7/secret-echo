import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { JWT_SECRET } from "../config/env";

export const signup: RequestHandler = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: "User created" });
    } catch (err) {
        next(err);
    }
};

export const login: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            // Call res.status(401).json() and then exit the function (without returning a value)
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        next(err);
    }
};

export const logout: RequestHandler = async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.json({ message: "Logout successful" });
    } catch (err) {
        next(err);
    }
};


import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "./globals.css";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push("/chat/general");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: "100vh" }}>
            <form onSubmit={handleLogin} className="container">
                <h1>Welcome Back</h1>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log In</button>
                <p>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </form>
        </div>
    );
}


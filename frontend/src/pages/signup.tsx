import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";
import "./globals.css";

export default function Signup() {
    const { signup } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: any) {
        e.preventDefault();
        await signup(username, email, password);
        router.push("/chat/general");
    }

    return (
        <div className="flex-center" style={{ minHeight: "100vh" }}>
            <form onSubmit={handleSubmit} className="container">
                <h1>Create Account</h1>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Sign Up</button>
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
}


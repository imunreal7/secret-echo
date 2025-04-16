import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";

export default function Signup() {
    const { signup } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        await signup(username, email, password);
        router.push("/chat/general");
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow">
                <h1 className="text-xl mb-4">Sign Up</h1>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full mb-4 p-2 border rounded"
                />
                <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
}


import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        await login(email, password);
        router.push("/chat/general");
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow">
                <h1 className="text-xl mb-4">Login</h1>
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
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                    Login
                </button>
            </form>
        </div>
    );
}


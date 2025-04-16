import { createContext, useState, useEffect, ReactNode } from "react";
import api from "../services/api";
import jwtDecode from "jwt-decode";

interface User {
    id: string;
    username: string;
    email: string;
}
interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded: any = jwtDecode(token);
            setUser({ id: decoded.userId, username: decoded.username, email: decoded.email });
        }
    }, []);

    async function login(email: string, password: string) {
        const { data } = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        setUser(data.user);
    }

    async function signup(username: string, email: string, password: string) {
        await api.post("/auth/signup", { username, email, password });
        await login(email, password);
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


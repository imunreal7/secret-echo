// pages/chat/[roomId].tsx

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import api from "../../services/api";
import io, { Socket } from "socket.io-client";
import "../globals.css";
import useAuth from "@/src/hooks/useAuth";

interface Message {
    _id: string;
    sender: string | null;
    roomId: string;
    content: string;
    createdAt: string;
}

export default function ChatPage() {
    const router = useRouter();
    const { roomId } = router.query as { roomId: string };
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { logout } = useAuth();
    // 🔑 Load current user’s name (replace with your auth logic)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("username");
            setUsername(saved);
        }
    }, []);

    // 📥 Fetch chat history
    useEffect(() => {
        if (!roomId) return;
        api.get(`/chats/${roomId}`).then((res) => setMessages(res.data));
    }, [roomId]);

    // 🔌 Set up socket.io
    useEffect(() => {
        if (!roomId) return;
        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
        socketRef.current = socket;
        socket.emit("join", roomId);

        socket.on("message", (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
            if (!msg.sender) {
                setLoading(false);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    // 🔄 Auto‑scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setLoading(true);
        await api.post("/chats", { roomId, content: newMessage.trim() });
        setNewMessage("");
    };

    const handleLogout = async () => {
        // 🚪 clear tokens, etc.
        await logout();
        router.push("/login");
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                background: "#f9fafb",
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* ─── 1) HEADER ───────────────────────────────────────── */}
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem 1.5rem",
                    background: "#4f46e5",
                    color: "#fff",
                    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h1 style={{ fontSize: "1.3rem", margin: 0, fontWeight: "bold", color: "#fff" }}>
                    Room: {roomId}
                </h1>
                <button
                    onClick={handleLogout}
                    style={{
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.7)",
                        color: "#fff",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "0.375rem",
                        cursor: "pointer",
                        transition: "background 0.2s ease-in-out",
                        width: "fit-content",
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
                    }
                    onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                >
                    Logout
                </button>
            </header>

            {/* ─── 2) MESSAGES ─────────────────────────────────────── */}
            <main
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                {messages.map((msg) => {
                    const isUser = msg.sender === username;
                    const label = msg.sender ? "You" : "AI Bot";

                    return (
                        <div
                            key={msg._id}
                            style={{
                                maxWidth: "75%",
                                alignSelf: isUser ? "flex-end" : "flex-start",
                                background: isUser ? "#e0e7ff" : "#ffffff",
                                color: isUser ? "#1e40af" : "#111827",
                                padding: "0.75rem 1rem",
                                borderRadius: "0.75rem",
                                boxShadow: isUser ? "none" : "0 1px 4px rgba(0,0,0,0.1)",
                                borderTopLeftRadius: isUser ? "0.75rem" : "0",
                                borderTopRightRadius: isUser ? "0" : "0.75rem",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    marginBottom: "0.3rem",
                                    color: "#374151",
                                }}
                            >
                                {label}
                            </div>
                            <div>{msg.content}</div>
                            <time
                                style={{
                                    display: "block",
                                    marginTop: "0.5rem",
                                    fontSize: "0.75rem",
                                    color: "#6b7280",
                                    textAlign: "right",
                                }}
                            >
                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </time>
                        </div>
                    );
                })}

                {loading && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div
                            style={{
                                width: "1.25rem",
                                height: "1.25rem",
                                border: "2px solid #d1d5db",
                                borderTop: "2px solid #6b7280",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                            }}
                        ></div>
                        <span style={{ color: "#4b5563", fontStyle: "italic" }}>AI is typing…</span>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </main>

            {/* ─── 3) INPUT ────────────────────────────────────────── */}
            <form
                onSubmit={handleSendMessage}
                style={{ padding: "1rem", background: "#ffffff", borderTop: "1px solid #e5e7eb" }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message…"
                        style={{
                            flex: 1,
                            padding: "0.75rem 1rem",
                            border: "1px solid #d1d5db",
                            borderRadius: "9999px",
                            outline: "none",
                            marginRight: "0.5rem",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            flex: 0,
                            padding: "0.5rem 0.75rem",
                            background: "#4f46e5",
                            color: "#fff",
                            border: "none",
                            borderRadius: "9999px",
                            cursor: "pointer",
                            transition: "background 0.3s ease",
                            fontSize: "0.9rem",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = "#4338ca")}
                        onMouseOut={(e) => (e.currentTarget.style.background = "#4f46e5")}
                    >
                        Send
                    </button>
                </div>
            </form>

            <style jsx>{`
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}


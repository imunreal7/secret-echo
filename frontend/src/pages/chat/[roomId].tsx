import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import api from "../../services/api";
import io, { Socket } from "socket.io-client";

interface Message {
    _id: string;
    sender: string | null;
    roomId: string;
    content: string;
    createdAt: string;
}

export default function ChatPage() {
    const router = useRouter();
    const { roomId } = router.query;
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch chat history on load
    useEffect(() => {
        if (!roomId) return;

        api.get(`/chats/${roomId}`)
            .then((res) => {
                setMessages(res.data);
            })
            .catch((error) => {
                console.error("Error fetching chat history:", error);
            });
    }, [roomId]);

    // Initialize Socket.io and join the room
    useEffect(() => {
        if (!roomId) return;

        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000");
        socketRef.current = socket;

        socket.emit("join", roomId);

        socket.on("message", (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
            // Stop loading indicator only when AI response arrives
            if (msg.sender === null) {
                setLoading(false);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    // Auto-scroll chat to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function handleSendMessage(e: React.FormEvent) {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageData = {
            roomId,
            content: newMessage.trim(),
        };

        try {
            setNewMessage("");
            setLoading(true);

            // Send message to backend; server will emit back both user and AI messages
            await api.post("/chats", messageData);
        } catch (error) {
            console.error("Error sending message:", error);
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <header className="p-4 bg-blue-600 text-white">
                <h1 className="text-xl">Room: {roomId}</h1>
            </header>
            <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`mb-2 p-2 rounded ${
                            msg.sender === "user" ? "bg-blue-300 self-end" : "bg-white self-start"
                        }`}
                    >
                        <p>{msg.content}</p>
                        <small className="block text-xs text-gray-600">
                            {new Date(msg.createdAt).toLocaleTimeString()}
                        </small>
                    </div>
                ))}
                {loading && (
                    <div className="flex items-center">
                        <span className="animate-spin mr-2">🔄</span> AI is typing...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>
            <form onSubmit={handleSendMessage} className="p-4 bg-gray-200 flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded border border-gray-300"
                />
                <button type="submit" className="ml-2 p-2 bg-blue-600 text-white rounded">
                    Send
                </button>
            </form>
        </div>
    );
}

import http from "http";
import { Server as IOServer } from "socket.io";
import app from "./app";
import { PORT } from "./config/env";

const httpServer = http.createServer(app);
const io = new IOServer(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("🔌 client connected:", socket.id);
    socket.on("join", (roomId) => socket.join(roomId));
    socket.on("message", (msg) => io.to(msg.roomId).emit("message", msg));
});

httpServer.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});


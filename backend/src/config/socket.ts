import { Server as IOServer } from "socket.io";
let io: IOServer;

export function initSocket(serverIo: IOServer) {
    io = serverIo;
}

export function getIo() {
    if (!io) throw new Error("Socket.io not initialized");
    return io;
}


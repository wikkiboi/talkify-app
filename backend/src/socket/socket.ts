import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import socketAuth from "./socketAuth";
import handleMessages from "./handleMessages";
import handleTyping from "./handleTyping";
import handleUserStatus from "./handleUserStatus";

export const initializeSocket = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:5173" },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    handleMessages(io, socket);
    handleTyping(io, socket);
    handleUserStatus(io, socket);
  });
};

import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import socketAuth from "./socketAuth";

export const initializeSocket = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:5173" },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send-message", ({ msg, sender }) => {
      const msgWithTime = {
        sender,
        msg,
        timeStamp: new Date().toLocaleTimeString(),
      };
      io.emit("receive-message", msgWithTime);
      console.log(msgWithTime);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

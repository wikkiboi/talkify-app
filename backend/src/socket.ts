import { Server } from "socket.io";
import { createServer } from "http";
import app from "./app";
import socketAuth from "./socket/socketAuth";

const server = createServer(app);
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

export { server, io };

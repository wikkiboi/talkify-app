import { Server, Socket } from "socket.io";
export default function handleTyping(io: Server, socket: Socket) {
  socket.on("typing", ({ roomId, username }) => {
    socket.to(roomId).emit("userTyping", { username, typing: true });
  });

  socket.on("typing", ({ roomId, username }) => {
    socket.to(roomId).emit("userTyping", { username, typing: false });
  });
}

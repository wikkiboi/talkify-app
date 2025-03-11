import { Server, Socket } from "socket.io";
export default function handleChat(io: Server, socket: Socket) {
  socket.on("join-conversation", ({ conversationId }) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined channel ${conversationId}`);
  });

  socket.on("leave-conversation", ({ conversationId }) => {
    socket.leave(conversationId);
    console.log(`User ${socket.id} joined channel ${conversationId}`);
  });
}

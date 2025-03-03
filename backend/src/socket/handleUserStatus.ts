import { Server, Socket } from "socket.io";

const onlineUsers = new Map<
  string,
  { status: "online" | "idle" | "offline"; lastActive: number }
>();

export default function handleUserStatus(io: Server, socket: Socket) {
  const userId = socket.handshake.auth.userId;

  if (!userId) return;

  onlineUsers.set(userId, { status: "online", lastActive: Date.now() });
  io.emit("userStatusUpdate", { userId, status: "online" });

  const idleTimeout = setTimeout(() => {
    if (onlineUsers.has(userId)) {
      onlineUsers.set(userId, { status: "idle", lastActive: Date.now() });
    }
  }, 5 * 60 * 1000);

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    io.emit("userStatusUpdate", { userId, status: "offline" });
    clearTimeout(idleTimeout);
  });

  socket.on("userActive", () => {
    clearTimeout(idleTimeout);
    onlineUsers.set(userId, { status: "online", lastActive: Date.now() });
    io.emit("userStatusUpdate", { userId, status: "online" });
  });
}

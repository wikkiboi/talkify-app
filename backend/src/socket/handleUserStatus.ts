import { Server, Socket } from "socket.io";
import { Space } from "../schema/spaceSchema";
import { User } from "../schema/userSchema";

const disconnectTimers = new Map<string, NodeJS.Timeout>();

export default function handleUserStatus(io: Server, socket: Socket) {
  const { username } = socket.user;
  if (!username) return;

  async function updateUserStatus(status: "online" | "idle" | "offline") {
    if (socket.user.status == status) return;
    const spaces = await Space.find({ "members.username": username }).select(
      "_id"
    );
    const spaceIds = spaces.map((space) => space._id.toString());

    console.log(`User went ${status}`);

    await User.updateOne({ username }, { $set: { status } });

    await Space.updateMany(
      { "members.username": username },
      { $set: { "members.$.status": status } }
    );

    spaceIds.forEach((spaceId) => {
      io.to(spaceId).emit("userStatusUpdate", { username, status });
    });

    io.to(socket.id).emit("userStatusUpdate", { username, status });
  }

  updateUserStatus("online");

  const idleTimeout = setTimeout(() => updateUserStatus("idle"), 5 * 60 * 1000);
  const reconnectTimer = setTimeout(() => {
    if (disconnectTimers.has(username)) {
      clearTimeout(disconnectTimers.get(username));
      disconnectTimers.delete(username);
    }
  }, 3000);

  socket.on("disconnect", async () => {
    clearTimeout(idleTimeout);

    const disconnectTimer = setTimeout(() => {
      updateUserStatus("offline");
      disconnectTimers.delete(username);
    }, 5000);
    disconnectTimers.set(username, disconnectTimer);
  });

  socket.on("reconnect", () => {
    updateUserStatus("online");
  });

  socket.on("userActive", () => {
    clearTimeout(idleTimeout);
    clearTimeout(reconnectTimer);
    disconnectTimers.delete(username);
    updateUserStatus("online");
  });
}

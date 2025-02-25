import { Server, Socket } from "socket.io";
export default function handleChannels(io: Server, socket: Socket) {
  socket.on("joinChannel", (channelId) => {
    socket.join(channelId);
    console.log(`User ${socket.id} joined channel ${channelId}`);
  });

  socket.on("leaveChannel", (channelId) => {
    socket.leave(channelId);
    console.log(`User ${socket.id} joined channel ${channelId}`);
  });

  socket.on("createChannel", ({ guildId, channelName }) => {
    io.emit("channelCreated", { guildId, channelName });
    console.log(`New channel ${channelName} created in guild ${guildId}`);
  });
}

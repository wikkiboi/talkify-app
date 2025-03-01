import { Server, Socket } from "socket.io";
import createMsg from "../utils/db/createMsg";
import parseTimestamp from "../utils/parseTimestamp";
import pushMsgToChannel from "../utils/db/channel/pushMsgToChannel";
import { getUserEmail } from "../utils/db/user";
export default function handleMessages(io: Server, socket: Socket) {
  socket.on("send-message", async ({ text, channelId, groupId, dmUsers }) => {
    try {
      if (!socket.user) {
        throw new Error("Not authenticated");
      }

      const user = await getUserEmail(socket.user.email);
      if (!user) {
        throw new Error("User not found");
      }

      const newMsg = await createMsg(
        user.username,
        user.id,
        text,
        channelId,
        groupId,
        dmUsers
      );

      if (!newMsg) {
        throw new Error("Failed to create message");
      }

      if (channelId) {
        const channel = await pushMsgToChannel(channelId, newMsg.id);
        if (!channel) {
          throw new Error("Failed to update DB with message");
        }
      }

      const targetRoom = channelId || groupId || dmUsers?.join("_");

      const timestamp = await parseTimestamp(newMsg.id);

      if (targetRoom) {
        socket.join(channelId);
        io.to(targetRoom).emit(
          "receive-message",
          newMsg.id,
          socket.user.username,
          text,
          timestamp
        );
      }
    } catch (error) {
      console.error("Error sending message: ", error);
      socket.emit("messageError", { error: "Failed to send message" });
    }
  });
}

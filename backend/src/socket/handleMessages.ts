import { Server, Socket } from "socket.io";
import createMsg from "../utils/db/createMsg";
import parseTimestamp from "../utils/parseTimestamp";
import pushMsgToChannel from "../utils/db/channel/pushMsgToChannel";
export default function handleMessages(io: Server, socket: Socket) {
  socket.on(
    "send-message",
    async ({ sender, text, channelId, groupId, dmUsers }) => {
      try {
        const newMsg = await createMsg(
          sender,
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
          io.to(targetRoom).emit(
            "receive-message",
            socket.user.username,
            text,
            timestamp
          );
        }
      } catch (error) {
        console.error("Error sending message: ", error);
        socket.emit("messageError", { error: "Failed to send message" });
      }
    }
  );
}

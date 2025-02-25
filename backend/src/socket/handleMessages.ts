import { Server, Socket } from "socket.io";
import createMsg from "../utils/db/createMsg";
import parseTimestamp from "../utils/parseTimestamp";
export default function handleMessages(io: Server, socket: Socket) {
  socket.on(
    "sendMessage",
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

        const targetRoom = channelId || groupId || dmUsers?.join("_");

        const timestamp = await parseTimestamp(newMsg.id);

        if (targetRoom) {
          io.to(targetRoom).emit(
            "receiveMessage",
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

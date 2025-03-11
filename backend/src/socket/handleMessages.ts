import { Server, Socket } from "socket.io";
import { createMsg } from "../utils/db/message";
import parseTimestamp from "../utils/parseTimestamp";

export default function handleMessages(io: Server, socket: Socket) {
  socket.on("send-message", async ({ text, conversationId }) => {
    try {
      const user = socket.user;
      if (!user) {
        throw new Error("Not authenticated");
      }

      const newMsg = await createMsg(
        user.username,
        user._id,
        text,
        conversationId
      );

      if (!newMsg) {
        throw new Error("Failed to create message");
      }

      const timestamp = await parseTimestamp(newMsg.id);

      socket.join(conversationId);
      io.to(conversationId).emit("receive-message", {
        _id: newMsg.id,
        sender: {
          username: user.username,
          userId: user.id,
        },
        text,
        timestamp,
      });
    } catch (error) {
      console.error("Error sending message: ", error);
      socket.emit("messageError", { error: "Failed to send message" });
    }
  });
}

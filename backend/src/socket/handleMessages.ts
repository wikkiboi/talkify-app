import { Server, Socket } from "socket.io";
import { createMsg, deleteMsg, updateMsg } from "../utils/db/message";
import parseTimestamp from "../utils/parseTimestamp";

export default function handleMessages(io: Server, socket: Socket) {
  socket.removeAllListeners("delete-message");

  socket.on("send-message", async ({ text, conversationId }) => {
    try {
      const user = socket.user;
      if (!user) {
        throw new Error("Not authenticated");
      }

      const newMsg = await createMsg(user.id, text, conversationId);
      if (!newMsg) {
        throw new Error("Failed to create message");
      }

      const timestamp = await parseTimestamp(newMsg.id);

      socket.join(conversationId);
      io.to(conversationId).emit("receive-message", {
        _id: newMsg.id,
        sender: {
          userId: newMsg.sender._id.toString(),
          username: newMsg.sender.username,
        },
        text,
        timestamp,
      });
    } catch (error) {
      console.error("Error sending message: ", error);
      socket.emit("messageError", { error: "Failed to send message" });
    }
  });

  socket.on("update-message", async ({ messageId, newText }) => {
    try {
      const user = socket.user;
      if (!user) throw new Error("Not authenticated");

      const updatedMsg = await updateMsg(messageId, user.id, newText);
      if (!updatedMsg) throw new Error("Failed to update message");

      io.to(updatedMsg.conversationId.toString()).emit("message-updated", {
        _id: updatedMsg.id,
        sender: {
          userId: updatedMsg.sender._id.toString(),
          username: updatedMsg.sender.username,
        },
        text: updatedMsg.text,
        updatedAt: updatedMsg.updatedAt,
      });
    } catch (error) {
      console.error("Error updating message: ", error);
      socket.emit("messageError", { error: "Failed to update message" });
    }
  });

  socket.on("delete-message", async ({ messageId }) => {
    try {
      const user = socket.user;
      if (!user) throw new Error("Not authenticated");

      const deletedMsg = await deleteMsg(user.id, messageId);
      console.log(deletedMsg);
      if (!deletedMsg) throw new Error("Failed to delete message");

      io.to(deletedMsg.conversationId.toString()).emit(
        "message-deleted",
        deletedMsg.id
      );
    } catch (error) {
      console.error("Error deleting message: ", error);
      socket.emit("messageError", { error: "Failed to delete message" });
    }
  });
}

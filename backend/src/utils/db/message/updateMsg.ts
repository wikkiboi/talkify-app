import mongoose from "mongoose";
import { Message } from "../../../schema/messageSchema";

export default async function updateMsg(
  conversationId: string,
  userId: mongoose.Types.ObjectId | string,
  text: string
) {
  const message = await Message.findOneAndUpdate(
    {
      conversationId,
      "sender.userId": userId,
    },
    {
      $set: { text },
    },
    { new: true }
  );

  return message;
}

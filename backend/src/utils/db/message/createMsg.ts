import { Message } from "../../../schema/messageSchema";
import mongoose from "mongoose";

export default async function createMsg(
  username: string,
  userId: mongoose.Types.ObjectId | string,
  text: string,
  conversationId: string
) {
  if (!conversationId) return;

  const message = Message.create({
    conversationId,
    sender: { userId, username },
    text,
  });

  return message;
}

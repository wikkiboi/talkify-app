import mongoose from "mongoose";
import { Message } from "../../../../schema/messageSchema";

export default async function updateMsg(
  msgId: string,
  userId: mongoose.Types.ObjectId | string,
  text: string
) {
  const message = await Message.findOneAndUpdate(
    {
      _id: msgId,
      sender: userId,
    },
    {
      $set: { text },
    },
    { new: true }
  );

  if (!message) return null;

  const populatedMessage = await message.populate<{
    sender: { _id: string; username: string };
  }>("sender", "username");

  return populatedMessage;
}

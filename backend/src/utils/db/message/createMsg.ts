import { Message } from "../../../schema/messageSchema";

export default async function createMsg(
  userId: string,
  text: string,
  conversationId: string
) {
  if (!conversationId) return;

  const message = await Message.create({
    conversationId,
    sender: userId,
    text,
  });

  const populatedMessage = await message.populate<{
    sender: { _id: string; username: string };
  }>("sender", "username");

  return populatedMessage;
}

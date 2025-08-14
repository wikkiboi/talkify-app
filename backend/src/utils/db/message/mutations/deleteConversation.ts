import { Message } from "../../../../schema/messageSchema";

export default async function deleteConversationMsgs(conversationId: string) {
  if (!conversationId) return;
  await Message.deleteMany({ conversationId });

  return;
}

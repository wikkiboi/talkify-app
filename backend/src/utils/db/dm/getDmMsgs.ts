import { Message } from "../../../schema/messageSchema";

export default async function getDmMsgs(dmId: string) {
  const msgs = await Message.find({ conversationId: dmId });

  return msgs;
}

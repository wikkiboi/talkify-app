import { Message } from "../../../../schema/messageSchema";

export default async function deleteMsg(userId: string, msgId: string) {
  const msg = await Message.findOneAndDelete({ _id: msgId, sender: userId });

  return msg;
}

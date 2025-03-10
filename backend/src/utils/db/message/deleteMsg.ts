import { Message } from "../../../schema/messageSchema";

export default async function deleteMsg(msgId: string) {
  const msg = await Message.findByIdAndDelete(msgId);

  return msg;
}

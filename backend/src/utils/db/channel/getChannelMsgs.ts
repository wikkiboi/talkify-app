import { Message } from "../../../schema/messageSchema";

export default async function getChannelMsgs(channelId: string) {
  if (!channelId) return null;
  const msgs = await Message.find({ channelId });

  return msgs;
}

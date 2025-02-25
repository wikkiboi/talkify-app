import { Channel } from "../../../schema/channelSchema";

export default async function pushMsgToChannel(
  channelId: string,
  msgId: string
) {
  if (!channelId || !msgId) return null;
  const channel = await Channel.findByIdAndUpdate(channelId, {
    $push: { messages: msgId },
  });

  return channel;
}

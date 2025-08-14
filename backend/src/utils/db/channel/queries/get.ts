import { Channel } from "../../../../schema/channelSchema";

export default async function getChannel(channelId: string) {
  if (!channelId) return null;
  const channel = await Channel.findById(channelId);

  return channel;
}

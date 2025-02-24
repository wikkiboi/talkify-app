import { Channel } from "../../../schema/channelSchema";

export default async function findChannelById(channelId: string) {
  if (!channelId) return null;
  const channel = await Channel.findById(channelId);

  return channel;
}

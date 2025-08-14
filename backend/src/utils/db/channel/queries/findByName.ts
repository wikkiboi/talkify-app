import { Channel } from "../../../../schema/channelSchema";

export default async function findChannelByName(name: string, spaceId: string) {
  if (!name) return null;
  const channel = await Channel.findOne({ name, spaceId });

  return channel;
}

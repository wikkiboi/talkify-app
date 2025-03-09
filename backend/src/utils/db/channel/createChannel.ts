import { Channel } from "../../../schema/channelSchema";

export default async function createChannel(name: string, spaceId: string) {
  if (!name || !spaceId) return null;
  const channel = await Channel.create({ name, spaceId });
  return channel;
}

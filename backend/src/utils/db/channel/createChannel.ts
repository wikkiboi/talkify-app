import { Channel } from "../../../schema/channelSchema";

export default async function createChannel(
  name: string,
  spaceId: string,
  defaultChannel: boolean = false
) {
  if (!name || !spaceId) return null;
  const channel = await Channel.create({ name, spaceId, defaultChannel });
  return channel;
}

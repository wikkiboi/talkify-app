import { Channel } from "../../../schema/channelSchema";

export default async function findChannelByName(name: string) {
  if (!name) return null;
  const channel = await Channel.findOne({ name });

  return channel;
}

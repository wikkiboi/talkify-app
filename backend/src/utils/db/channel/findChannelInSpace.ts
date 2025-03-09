import { Channel } from "../../../schema/channelSchema";

export default async function findChannelInSpace(spaceId: string) {
  if (!spaceId) return;
  const channel = await Channel.findOne({ spaceId });

  return channel;
}

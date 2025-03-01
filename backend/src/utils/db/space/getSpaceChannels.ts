import { Channel } from "../../../schema/channelSchema";
export default async function getSpaceChannels(spaceId: string) {
  if (!spaceId) return [];
  const channels = await Channel.find({ spaceId }, { spaceId: 0 });

  return channels;
}

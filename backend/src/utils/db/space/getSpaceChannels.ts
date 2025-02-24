import { Channel } from "../../../schema/channelSchema";
export default async function getSpaceChannels(guildId: string) {
  if (!guildId) return;
  const channels = await Channel.find({ guildId });

  return channels;
}

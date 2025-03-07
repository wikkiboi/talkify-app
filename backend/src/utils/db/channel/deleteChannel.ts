import { Channel } from "../../../schema/channelSchema";

export default async function deleteChannel(
  spaceId: string,
  channelId: string
) {
  if (!spaceId || !channelId) return;
  const channel = await Channel.findByIdAndDelete({ _id: channelId, spaceId });

  return channel;
}

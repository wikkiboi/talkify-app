import { Channel } from "../../../../schema/channelSchema";

export default async function updateChannel(
  spaceId: string,
  channelId: string,
  name: string
) {
  if (!name || !spaceId || !channelId) return;
  const channel = await Channel.updateOne(
    { _id: channelId, spaceId },
    { $set: { name } },
    { new: true }
  );

  return channel;
}

import { Channel } from "../../../schema/channelSchema";
import { User } from "../../../schema/userSchema";

export default async function deleteSpaceChannels(spaceId: string) {
  if (!spaceId) return;
  await Channel.deleteMany({ spaceId });

  return;
}

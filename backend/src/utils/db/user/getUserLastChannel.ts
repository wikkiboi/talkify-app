import { User } from "../../../schema/userSchema";

export default async function getUserLastChannel(
  userId: string,
  spaceId: string
) {
  if (!userId || !spaceId) return;
  const channel = await User.findOne({
    _id: userId,
    "spaces.spaceId": spaceId,
  }).select("spaces.lastVisitedChannel");

  return channel;
}

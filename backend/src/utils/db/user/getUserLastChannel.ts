import { User } from "../../../schema/userSchema";

export default async function getUserLastChannel(
  userId: string,
  spaceId: string
) {
  if (!userId || !spaceId) return;
  const user = await User.findOne({
    _id: userId,
    "spaces.spaceId": spaceId,
  }).select("spaces");

  return (
    user?.spaces?.find((s) => s.spaceId.toString() === spaceId)
      ?.lastVisitedChannel || null
  );
}

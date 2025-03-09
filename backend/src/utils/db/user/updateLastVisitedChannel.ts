import { User } from "../../../schema/userSchema";

export default async function updateLastVisitedChannel(
  userId: string,
  spaceId: string,
  channelId: string
) {
  if (!userId || !spaceId || !channelId) return;
  const user = await User.updateOne(
    {
      _id: userId,
      "spaces.spaceId": spaceId,
    },
    {
      $set: {
        "spaces.$.lastVisitedChannel": channelId,
      },
    }
  );

  return user;
}

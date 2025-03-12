import { User } from "../../../schema/userSchema";

export default async function findPendingRequest(
  userId: string,
  friendId: string
) {
  if (!friendId) return;
  const friend = await User.findOne({
    _id: friendId,
    friends: {
      $elemMatch: { userId, friendStatus: "pending" },
    },
  })
    .select("_id username status")
    .lean();

  return friend;
}

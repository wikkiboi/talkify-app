import { User } from "../../../../schema/userSchema";

export default async function findFriend(userId: string, friendId: string) {
  if (!friendId) return;
  const friend = await User.findOne({
    _id: friendId,
    friends: {
      $elemMatch: {
        userId,
        friendStatus: "accepted",
      },
    },
  })
    .populate({
      path: "friends.userId",
      select: "username status",
    })
    .lean();

  return friend;
}

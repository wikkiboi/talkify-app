import { User } from "../../../../schema/userSchema";

export default async function sendFriendRequest(
  userId: string,
  friendId: string
) {
  const friend = await User.findByIdAndUpdate(
    friendId,
    {
      $push: {
        friends: {
          userId: userId,
          friendStatus: "pending",
        },
      },
    },
    { new: true }
  )
    .populate({
      path: "friends.userId",
      select: "username status",
    })
    .lean();

  if (!friend) {
    return { user: null, friend: null };
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        friends: {
          userId: friendId,
          friendStatus: "requested",
        },
      },
    },
    { new: true }
  )
    .populate({
      path: "friends.userId",
      select: "username status",
    })
    .lean();

  return { user, friend };
}

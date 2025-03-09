import { User } from "../../../schema/userSchema";

export default async function sendFriendRequest(
  userId: string,
  username: string,
  friendId: string
) {
  const friend = await User.findByIdAndUpdate(
    friendId,
    {
      $push: {
        friends: {
          userId: userId,
          username: username,
          friendStatus: "pending",
        },
      },
    },
    { new: true }
  ).select("username");

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
  );

  return { user, friend };
}

import { User } from "../../../schema/userSchema";

export default async function removeFriend(
  userId: string,
  friendId: string,
  friendName: string
) {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $pull: {
        friends: {
          userId: friendId,
          username: friendName,
        },
      },
    },
    { new: true }
  );

  const friend = await User.findByIdAndUpdate(
    friendId,
    {
      $pull: {
        friends: {
          userId: user?.id,
          username: user?.username,
        },
      },
    },
    { new: true }
  );

  console.log(friend);

  return { user, friend };
}

import { User } from "../../../../schema/userSchema";

export default async function removeFriend(userId: string, friendId: string) {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $pull: {
        friends: {
          userId: friendId,
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
          userId,
        },
      },
    },
    { new: true }
  );

  console.log(friend);

  return { user, friend };
}

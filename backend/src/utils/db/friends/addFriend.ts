import { User } from "../../../schema/userSchema";

export default async function addFriend(
  userId: string,
  friendId: string,
  friendStatus: "online" | "offline" | "idle"
) {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        "friends.$[elem].status": friendStatus,
        "friends.$[elem].friendStatus": "accepted",
      },
    },
    {
      arrayFilters: [{ "elem.userId": friendId }],
      new: true,
    }
  );

  const friend = await User.findByIdAndUpdate(
    friendId,
    {
      $set: {
        "friends.$[elem].status": user?.status,
        "friends.$[elem].friendStatus": "accepted",
      },
    },
    {
      arrayFilters: [{ "elem.userId": user?.id }],
      new: true,
    }
  );

  return { user, friend };
}

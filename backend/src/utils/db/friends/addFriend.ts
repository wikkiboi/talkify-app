import { User } from "../../../schema/userSchema";

export default async function addFriend(userId: string, friendId: string) {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        "friends.$[elem].friendStatus": "accepted",
      },
    },
    {
      arrayFilters: [{ "elem.userId": friendId }],
      new: true,
    }
  )
    .populate({
      path: "friends.userId",
      select: "username status",
    })
    .lean();

  const friend = await User.findByIdAndUpdate(
    friendId,
    {
      $set: {
        "friends.$[elem].friendStatus": "accepted",
      },
    },
    {
      arrayFilters: [{ "elem.userId._id": user?.id }],
      new: true,
    }
  )
    .populate({
      path: "friends.userId",
      select: "username status",
    })
    .lean();

  console.log(friend);

  return { user, friend };
}

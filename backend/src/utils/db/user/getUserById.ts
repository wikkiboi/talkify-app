import { User } from "../../../schema/userSchema";

export default async function getUserById(id: string) {
  if (!id) return null;
  const user = await User.findById(id)
    .populate({
      path: "friends.userId",
      select: "username status",
    })
    .lean();
  return user;
}

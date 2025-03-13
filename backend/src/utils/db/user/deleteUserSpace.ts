import { User } from "../../../schema/userSchema";

export default async function deleteUserSpace(userId: string, spaceId: string) {
  if (!spaceId || !userId) return;
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { spaces: { spaceId } } },
    { new: true }
  );

  return user;
}

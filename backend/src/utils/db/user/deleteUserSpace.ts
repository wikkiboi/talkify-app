import { User } from "../../../schema/userSchema";

export default async function deleteUserSpace(spaceId: string, userId: string) {
  if (!spaceId || !userId) return;
  const user = await User.updateMany(
    { _id: userId },
    { $pull: { spaces: { spaceId } } }
  );

  return user;
}

import { User } from "../../../schema/userSchema";

export default async function addUserSpace(
  userId: string,
  spaceId: string,
  name: string
) {
  if (!userId || !spaceId) return null;
  const user = User.findByIdAndUpdate(userId, {
    $push: { spaces: { name, spaceId } },
  });

  return user;
}

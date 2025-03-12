import { User } from "../../../schema/userSchema";

export default async function getUserSpaces(userId: string) {
  const user = await User.findById(userId).populate({
    path: "spaces.spaceId",
    select: "_id defaultChannel",
  });

  return user;
}

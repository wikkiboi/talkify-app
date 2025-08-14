import { User } from "../../../../schema/userSchema";

export default async function updateUserSpace(
  userId: string,
  spaceId: string,
  name: string,
  color: string
) {
  if (!userId || !spaceId || !name || !color) return null;
  console.log(name, color);
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        "spaces.$[elem].name": name,
        "spaces.$[elem].color": color,
      },
    },
    {
      arrayFilters: [{ "elem.spaceId": spaceId }],
      new: true,
    }
  );

  return user;
}

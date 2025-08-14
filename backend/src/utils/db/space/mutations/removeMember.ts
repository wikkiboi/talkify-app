import { Space } from "../../../../schema/spaceSchema";

export default async function removeSpaceMember(
  userId: string,
  spaceId: string
) {
  if (!userId) return null;
  const space = await Space.findByIdAndUpdate(
    spaceId,
    {
      $pull: {
        admins: {
          userId,
        },
        members: {
          userId,
        },
      },
    },
    {
      new: true,
    }
  );

  return space;
}

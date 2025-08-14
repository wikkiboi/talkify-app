import { Space } from "../../../../schema/spaceSchema";
export default async function getSpaceOwner(spaceId: string, userId: string) {
  if (!spaceId || !userId) return;
  const space = await Space.findOne(
    {
      _id: spaceId,
      owner: userId,
    },
    { createdAt: 0, updatedAt: 0 }
  );

  return space;
}

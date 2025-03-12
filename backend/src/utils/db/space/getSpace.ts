import { Space } from "../../../schema/spaceSchema";
export default async function getSpace(spaceId: string, userId: string) {
  if (!spaceId || !userId) return;

  const space = await Space.findOne(
    {
      _id: spaceId,
      members: { $elemMatch: { userId } },
    },
    { createdAt: 0, updatedAt: 0 }
  );

  return space;
}

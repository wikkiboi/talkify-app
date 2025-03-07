import { Space } from "../../../schema/spaceSchema";
export default async function getSpace(spaceId: string, username: string) {
  if (!spaceId || !username) return;
  const space = await Space.findOne(
    {
      _id: spaceId,
      members: { $elemMatch: { username } },
    },
    { createdAt: 0, updatedAt: 0 }
  );

  return space;
}

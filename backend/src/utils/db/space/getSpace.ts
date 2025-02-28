import { Space } from "../../../schema/spaceSchema";
export default async function getSpace(spaceId: string, userId: string) {
  if (!spaceId) return;
  const space = await Space.findOne({ _id: spaceId, members: userId });

  return space;
}

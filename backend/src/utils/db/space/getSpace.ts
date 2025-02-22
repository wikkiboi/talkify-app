import { Space } from "../../../schema/spaceSchema";

export default async function getSpace(spaceId: string) {
  if (!spaceId) return null;
  const space = await Space.findById(spaceId);

  return space;
}

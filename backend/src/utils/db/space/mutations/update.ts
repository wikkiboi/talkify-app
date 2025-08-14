import { Space } from "../../../../schema/spaceSchema";

export default async function updateSpace(
  spaceId: string,
  name: string,
  color: string
) {
  if (!name && !color) return;
  const space = await Space.updateOne(
    { _id: spaceId },
    { $set: { name, color } },
    { new: true }
  );

  return space;
}

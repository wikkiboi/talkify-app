import { Space } from "../../../schema/spaceSchema";

export default async function createSpace(name: string) {
  if (!name) return null;
  const space = await Space.create({
    name,
    channels: [],
  });

  return space;
}

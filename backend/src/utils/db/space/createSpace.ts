import mongoose from "mongoose";
import { Space } from "../../../schema/spaceSchema";

export default async function createSpace(
  name: string,
  ownerId: mongoose.Types.ObjectId
) {
  if (!name || !ownerId) return null;
  const space = await Space.create({
    name,
    owner: ownerId,
    admins: [ownerId],
    members: [ownerId],
  });

  return space;
}

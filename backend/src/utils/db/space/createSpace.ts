import mongoose from "mongoose";
import { Space } from "../../../schema/spaceSchema";

export default async function createSpace(
  name: string,
  ownerId: mongoose.Types.ObjectId,
  ownerName: string
) {
  if (!name || !ownerId) return null;

  const space = await Space.create({
    name,
    owner: ownerId,
    admins: [{ userId: ownerId, username: ownerName }],
    members: [{ userId: ownerId, username: ownerName }],
  });

  return space;
}

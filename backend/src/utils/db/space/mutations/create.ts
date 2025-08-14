import mongoose from "mongoose";
import { Space } from "../../../../schema/spaceSchema";
import isHexColor from "../../../isHexColor";

export default async function createSpace(
  name: string,
  ownerId: mongoose.Types.ObjectId,
  ownerName: string,
  color: string
) {
  if (!name || !ownerId || (color && !isHexColor(color))) return null;
  const space = await Space.create({
    name,
    owner: ownerId,
    admins: [{ userId: ownerId, username: ownerName }],
    members: [{ userId: ownerId, username: ownerName }],
    color,
  });

  return space;
}

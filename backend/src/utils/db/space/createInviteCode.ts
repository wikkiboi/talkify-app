import { Space } from "../../../schema/spaceSchema";
import generateCode from "../../generateCode";

export default async function createInviteCode(
  spaceId: string,
  expiration?: number,
  usageLimit?: number
) {
  if (!spaceId) return null;
  const { code, expiresAt, maxUses } = generateCode(expiration, usageLimit);

  const space = await Space.findByIdAndUpdate(
    spaceId,
    {
      $push: {
        invites: { code, expiresAt, maxUses, uses: 0 },
      },
    },
    { new: true }
  );

  return space;
}

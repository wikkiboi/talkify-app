import { Space } from "../../../../schema/spaceSchema";

export default async function findInviteCode(code: string) {
  if (!code) return;

  const space = await Space.findOne({
    invites: {
      $elemMatch: { code },
    },
  });

  if (!space) return;

  const invite = space?.invites.find((inv) => inv.code === code);
  return { space, invite };
}

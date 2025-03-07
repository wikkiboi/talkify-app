import { Space } from "../../../schema/spaceSchema";

export default async function addSpaceMember(
  spaceId: string,
  inviteCode: string,
  userId: string,
  username: string,
  status?: string
) {
  if (!userId || !username) return null;
  const space = await Space.findByIdAndUpdate(
    spaceId,
    {
      $push: {
        members: {
          userId,
          username,
          status,
        },
      },
      $inc: { "invites.$[inviteElem].uses": 1 },
    },
    {
      new: true,
      arrayFilters: [
        {
          "inviteElem.code": inviteCode,
        },
      ],
    }
  );

  return space;
}

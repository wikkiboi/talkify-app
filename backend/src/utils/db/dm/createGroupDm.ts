import { GroupDM } from "../../../schema/groupDMSchema";

export default async function createGroupDm(
  participantIds: string[],
  ownerId: string,
  groupName?: string
) {
  const groupDm = await GroupDM.create({
    name: groupName || null,
    participants: participantIds,
    owner: ownerId,
  });

  return groupDm;
}

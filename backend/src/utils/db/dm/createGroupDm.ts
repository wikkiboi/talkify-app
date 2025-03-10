import { GroupDM } from "../../../schema/GroupDMSchema";

export default async function createGroupDm(
  participantIds: string[],
  groupName?: string
) {
  const groupDm = await GroupDM.create({
    name: groupName || null,
    participants: participantIds,
  });

  return groupDm;
}

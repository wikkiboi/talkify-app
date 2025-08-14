import { GroupDM } from "../../../../../schema/groupDMSchema";

export default async function deleteGroupDm(groupId: string, ownerId: string) {
  const groupDm = await GroupDM.findOneAndDelete({
    _id: groupId,
    owner: ownerId,
  });

  return groupDm;
}

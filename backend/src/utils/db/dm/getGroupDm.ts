import { GroupDM } from "../../../schema/groupDMSchema";

export default async function getGroupDm(groupId: string, userId: string) {
  const groupDm = await GroupDM.findOne({
    _id: groupId,
    participants: userId,
  }).populate("participants", "username");

  return groupDm;
}

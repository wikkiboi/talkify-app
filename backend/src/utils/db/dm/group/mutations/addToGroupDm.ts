import { GroupDM } from "../../../../../schema/groupDMSchema";

export default async function addToGroupDm(groupId: string, userId: string) {
  const groupDm = await GroupDM.findByIdAndUpdate(
    groupId,
    {
      $addToSet: { participants: userId },
    },
    { new: true }
  ).populate("participants", "username");

  return groupDm;
}

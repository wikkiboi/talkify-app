import { GroupDM } from "../../../../../schema/groupDMSchema";

export default async function leaveGroupDm(groupId: string, userId: string) {
  const groupDm = await GroupDM.findByIdAndUpdate(
    groupId,
    {
      $pull: { participants: userId },
    },
    { new: true }
  );

  return groupDm;
}

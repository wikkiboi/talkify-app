import { GroupDM } from "../../../schema/groupDMSchema";

export default async function addToGroupDm(groupId: string, userId: string) {
  const groupDm = await GroupDM.findByIdAndUpdate(
    groupId,
    {
      $push: { participants: userId },
    },
    { new: true }
  );

  return groupDm;
}

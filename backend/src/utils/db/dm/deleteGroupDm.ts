import { GroupDM } from "../../../schema/groupDMSchema";

export default async function deleteGroupDm(groupId: string) {
  const groupDm = await GroupDM.findByIdAndDelete(groupId);

  return groupDm;
}

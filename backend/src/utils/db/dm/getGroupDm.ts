import { GroupDM } from "../../../schema/groupDMSchema";

export default async function getGroupDm(groupId: string) {
  const groupDm = await GroupDM.findById(groupId).populate(
    "participants",
    "username"
  );

  return groupDm;
}

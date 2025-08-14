import { GroupDM } from "../../../../schema/groupDMSchema";

export default async function getUserGroupDms(userId: string) {
  const dms = await GroupDM.find({
    participants: userId,
  }).populate("participants", "username");

  return dms;
}

import { DirectMessage } from "../../../../../schema/directMessageSchema";

export default async function getDm(dmId: string, userId: string) {
  const dm = await DirectMessage.findOne({
    _id: dmId,
    participants: userId,
  }).populate("participants", "username");

  return dm;
}

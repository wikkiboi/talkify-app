import { DirectMessage } from "../../../schema/directMessageSchema";

export default async function getUserDms(userId: string) {
  const dms = await DirectMessage.find({
    participants: userId,
  }).populate("participants", "username");

  return dms;
}

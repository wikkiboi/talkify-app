import { DirectMessage } from "../../../schema/directMessageSchema";

export default async function getDm(dmId: string) {
  const dm = await DirectMessage.findById(dmId).populate(
    "participants",
    "username"
  );

  return dm;
}

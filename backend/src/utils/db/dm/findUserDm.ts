import { DirectMessage } from "../../../schema/directMessageSchema";

export default async function findUserDm(userId1: string, userId2: string) {
  const dm = await DirectMessage.findOne({
    participants: { $all: [userId1, userId2] },
  });

  return dm;
}

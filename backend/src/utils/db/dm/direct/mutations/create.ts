import { DirectMessage } from "../../../../../schema/directMessageSchema";

export default async function createDm(userId1: string, userId2: string) {
  const dm = await DirectMessage.create({
    participants: [userId1, userId2],
  });

  return dm;
}

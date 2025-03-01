import { Message } from "../../schema/messageSchema";
import mongoose, { InferSchemaType } from "mongoose";

export default async function createMsg(
  username: string,
  userId: mongoose.Types.ObjectId,
  text: string,
  channel?: string,
  group?: string,
  dm?: string[]
) {
  const channelId = channel ? new mongoose.Types.ObjectId(channel) : undefined;
  const groupId = group ? new mongoose.Types.ObjectId(group) : undefined;
  const dmUsers = dm
    ? dm.map((id: string) => new mongoose.Types.ObjectId(id))
    : undefined;

  if (!channelId && !groupId && !dmUsers) return null;

  const message = Message.create({
    sender: { userId, username },
    text,
    channelId,
    groupId,
    dmUsers,
  });

  return message;
}

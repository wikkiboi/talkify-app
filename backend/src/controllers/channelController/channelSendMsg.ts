import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import createMsg from "../../utils/db/createMsg";
import { findChannelById } from "../../utils/db/channel";
import { getUser } from "../../utils/db/user";
import parseTimestamp from "../../utils/parseTimestamp";

export default async function channelSendMsg(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { channelId } = req.params;
  const { text } = req.body;
  const { username } = req.auth?.user;

  try {
    const user = await getUser(username);
    if (!user) {
      res.status(404);
      throw new Error("Channel Msg Send Error: User not found");
    }
    if (!text) {
      res.status(400);
      throw new Error("Channel Msg Send Error: No text body");
    }

    const channelExists = await findChannelById(channelId);
    if (!channelExists) {
      res.status(404);
      throw new Error("Channel Error: Channel not found");
    }

    const newMsg = await createMsg(user.id, text, channelId);
    if (!newMsg) {
      res.status(500);
      throw new Error("Message Error: Failed to create message");
    }

    const timestamp = await parseTimestamp(newMsg.id);

    const io = req.app.get("io");
    io.to(channelId).emit("newMessage", user.username, newMsg.text, timestamp);

    return res.status(201).json(newMsg);
  } catch (error) {
    return next(error);
  }
}

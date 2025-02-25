import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import createMsg from "../../utils/db/createMsg";
import { findChannelById } from "../../utils/db/channel";
import { getUser } from "../../utils/db/user";

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

    const newMsg = createMsg(user.id, text, channelId);

    const io = req.app.get("io");
    io.to(channelId).emit("newMessage", newMsg);

    return res.status(201).json(newMsg);
  } catch (error) {
    return next(error);
  }
}

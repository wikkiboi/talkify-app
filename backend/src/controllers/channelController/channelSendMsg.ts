import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { createMsg } from "../../utils/db/message";
import { findChannelById } from "../../utils/db/channel";
import parseTimestamp from "../../utils/parseTimestamp";

export default async function channelSendMsg(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { channelId } = req.params;
  const { text } = req.body;
  const { id, username } = req.auth?.user;

  try {
    if (!text) {
      res.status(400);
      throw new Error("Channel Msg Send Error: No text body");
    }

    const channelExists = await findChannelById(channelId);
    if (!channelExists) {
      res.status(404);
      throw new Error("Channel not found");
    }

    const newMsg = await createMsg(username, id, text, channelId);
    if (!newMsg) {
      res.status(500);
      throw new Error("Message Error: Failed to create message");
    }

    const timestamp = await parseTimestamp(newMsg.id);

    const io = req.app.get("io");
    io.to(channelId).emit("receive-message", {
      _id: newMsg.id,
      sender: {
        username: newMsg.sender.username,
        userId: newMsg.sender.userId.toString(),
      },
      text: newMsg.text,
      timestamp,
    });

    return res.status(201).json({ newMsg });
  } catch (error) {
    return next(error);
  }
}

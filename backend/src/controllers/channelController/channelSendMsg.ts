import { NextFunction, Request, Response } from "express";
import createMsg from "../../utils/db/createMsg";
import { findChannel } from "../../utils/db/channel";

export default async function channelSendMsg(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { channelId } = req.params;
  const { user, text } = req.body;

  try {
    if (!user) {
      res.status(404);
      throw new Error("Channel Msg Send Error: User not found");
    }
    if (!text) {
      res.status(400);
      throw new Error("Channel Msg Send Error: No text body");
    }

    const channelExists = await findChannel(channelId);
    if (!channelExists) {
      res.status(404);
      throw new Error("Channel Error: Channel not found");
    }

    const newMsg = createMsg(user, text, channelId);

    return res.status(201).json(newMsg);
  } catch (error) {
    return next(error);
  }
}

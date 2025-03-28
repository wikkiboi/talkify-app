import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getSpace } from "../../utils/db/space";
import { getChannelMsgs } from "../../utils/db/channel";

export default async function channelGetMsgs(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId, channelId } = req.params;
  const { id } = req.auth?.user;

  try {
    const space = await getSpace(spaceId, id);
    if (!space) {
      res.status(404);
      throw new Error("Space not found or user not in space");
    }

    const channelMsgs = await getChannelMsgs(channelId);
    if (!channelMsgs) {
      res.status(404);
      throw new Error("Channel not found");
    }

    return res.status(200).json({ messages: channelMsgs });
  } catch (error) {
    return next(error);
  }
}

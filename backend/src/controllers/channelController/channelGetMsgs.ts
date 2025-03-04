import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import createMsg from "../../utils/db/createMsg";
import { findChannelById } from "../../utils/db/channel";
import { getUser } from "../../utils/db/user";
import parseTimestamp from "../../utils/parseTimestamp";
import getSpace from "../../utils/db/space/getSpace";
import getChannelMsgs from "../../utils/db/channel/getChannelMsgs";

export default async function channelGetMsgs(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId, channelId } = req.params;
  const { username } = req.auth?.user;

  try {
    const space = await getSpace(spaceId, username);
    if (!space) {
      res.status(404);
      throw new Error("Space not found or user not in space");
    }

    const channelMsgs = await getChannelMsgs(channelId);
    if (!channelMsgs) {
      res.status(404);
      throw new Error("Channel not found");
    }

    return res.status(201).json(channelMsgs);
  } catch (error) {
    return next(error);
  }
}

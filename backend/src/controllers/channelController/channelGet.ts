import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getSpace } from "../../utils/db/space";
import { getChannel } from "../../utils/db/channel";

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

    const channel = await getChannel(channelId);
    if (!channel || channel.spaceId.toString() !== spaceId) {
      res.status(400);
      throw new Error("Invalid channel for this space");
    }

    return res.status(201).json({ channel });
  } catch (error) {
    return next(error);
  }
}

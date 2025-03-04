import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import { findChannelByName, createChannel } from "../../utils/db/channel";
import getSpace from "../../utils/db/space/getSpace";
export default async function channelCreate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { name } = req.body;
  const { username } = req.auth?.user;
  try {
    if (!name) {
      res.status(400);
      throw new Error("Please add a name to channel");
    }

    const space = await getSpace(spaceId, username);
    if (!space) {
      res.status(404);
      throw new Error("Space not found");
    }

    const existingChannel = await findChannelByName(name, space.id);
    if (existingChannel) {
      res.status(400);
      throw new Error("Channel already exists");
    }

    const channel = await createChannel(name, spaceId);

    return res.status(201).json(channel);
  } catch (error) {
    return next(error);
  }
}

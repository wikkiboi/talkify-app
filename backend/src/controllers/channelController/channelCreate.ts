import { Request, Response, NextFunction } from "express";
import { getSpace } from "../../utils/db/space";
import { findChannelByName, createChannel } from "../../utils/db/channel";
export default async function channelCreate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { name } = req.body;
  try {
    if (!name) {
      res.status(400);
      throw new Error("Please add a name to channel");
    }
    console.log(req.params);
    const space = await getSpace(spaceId);
    if (!space) {
      res.status(404);
      throw new Error("Space not found");
    }

    const existingChannel = await findChannelByName(name);
    if (existingChannel) {
      res.status(400);
      throw new Error("Channel already exists");
    }

    const channel = createChannel(name, spaceId);

    return res.status(201).json(channel);
  } catch (error) {
    return next(error);
  }
}

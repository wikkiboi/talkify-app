import { Request, Response, NextFunction } from "express";
import { createChannel } from "../../utils/db/channel";
import { getSpace } from "../../utils/db/space";

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
    const space = await getSpace(spaceId);
    if (!space) {
      res.status(404);
      throw new Error("Space not found");
    }

    const channel = createChannel(name, spaceId);

    return res.status(201).json(channel);
  } catch (error) {
    return next(error);
  }
}

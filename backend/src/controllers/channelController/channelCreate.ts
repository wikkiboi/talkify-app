import { Request, Response, NextFunction } from "express";
import { createChannel } from "../../utils/db/channel";
import { getSpace } from "../../utils/db/space";

export default async function channelCreate(
  res: Response,
  req: Request,
  next: NextFunction
) {
  const { spaceId } = req.params;
  const { name } = req.body;
  try {
    if (!name) {
      res.status(400);
      throw new Error("Please add a name to channel");
    }
    const space = await getSpace(spaceId);
    if (!space) return res.status(404).json({ error: "Space not found" });

    const channel = createChannel(name, spaceId);

    res.status(201).json(channel);
  } catch (error) {
    return next(error);
  }
}

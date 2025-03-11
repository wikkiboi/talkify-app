import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getSpace, getSpaceChannels } from "../../utils/db/space";

export default async function spaceGet(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { id } = req.auth?.user;

  try {
    const space = await getSpace(spaceId, id);
    if (!space) {
      res.status(404);
      throw new Error("Space not found or user not in space");
    }

    const spaceChannels = await getSpaceChannels(space.id);
    if (!spaceChannels) {
      res.status(404);
      throw new Error("No channels found in Space");
    }

    return res.status(201).json({
      space,
      channels: spaceChannels,
    });
  } catch (error) {
    next(error);
  }
}

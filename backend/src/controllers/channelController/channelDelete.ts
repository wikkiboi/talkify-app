import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUser } from "../../utils/db/user";
import { getSpaceAdmin } from "../../utils/db/space";
import { deleteChannel, findChannelInSpace } from "../../utils/db/channel";

export default async function channelDelete(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId, channelId } = req.params;
  const { id } = req.auth?.user;
  try {
    if (!spaceId || !channelId) {
      res.status(401);
      throw new Error("No space or channel id found in params");
    }

    const space = await getSpaceAdmin(spaceId, id);
    if (!space) {
      res.status(401);
      throw new Error("User is not the admin of this space");
    }

    const channel = await deleteChannel(space.id, channelId);
    if (!channel) {
      res.status(500);
      throw new Error("Failed to delete channel");
    }

    if (space.defaultChannel?.toString() === channel.id) {
      const otherChannel = await findChannelInSpace(space.id);

      space.defaultChannel = otherChannel?._id ?? null;
      await space.save();
    }

    return res.status(201).json({ channel });
  } catch (error) {
    return next(error);
  }
}

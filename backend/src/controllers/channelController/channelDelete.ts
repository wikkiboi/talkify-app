import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUser } from "../../utils/db/user";
import getSpaceAdmin from "../../utils/db/space/getSpaceAdmin";
import deleteChannel from "../../utils/db/channel/deleteChannel";

export default async function channelDelete(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId, channelId } = req.params;
  const { username } = req.auth?.user;
  try {
    if (!spaceId || !channelId) {
      res.status(401);
      throw new Error("No space or channel id found in params");
    }
    const user = await getUser(username);
    if (!user) {
      res.status(404);
      throw new Error("Create Space Error: User not found");
    }

    const space = await getSpaceAdmin(spaceId, user.id);
    if (!space) {
      res.status(401);
      throw new Error("User is not the admin of this space");
    }

    const channel = await deleteChannel(spaceId, channelId);
    if (!channel) {
      res.status(500);
      throw new Error("Failed to delete channel");
    }

    return res
      .status(201)
      .json({ message: "Channel successfully deleted", channel });
  } catch (error) {
    return next(error);
  }
}

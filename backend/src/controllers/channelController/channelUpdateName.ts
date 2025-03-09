import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUser } from "../../utils/db/user";
import { getSpaceAdmin } from "../../utils/db/space";
import { updateChannel } from "../../utils/db/channel";

export default async function channelUpdateName(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId, channelId } = req.params;
  const { name } = req.body;
  const { username } = req.auth?.user;
  try {
    if (!spaceId || !channelId) {
      res.status(400);
      throw new Error("No space or channel id found in params");
    }
    if (!name) {
      res.status(400);
      throw new Error("Please pass in a name");
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

    const channel = await updateChannel(spaceId, channelId, name);
    if (!channel) {
      res.status(500);
      throw new Error("Failed to update channel");
    }

    return res.status(201).json({ channel });
  } catch (error) {
    return next(error);
  }
}

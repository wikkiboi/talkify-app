import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUser, getUserLastChannel } from "../../utils/db/user";

export default async function userGetLastVisited(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { username } = req.auth?.user;

  try {
    const user = await getUser(username);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const channel = await getUserLastChannel(user.id, spaceId);
    if (!channel) {
      return res.status(201).json({
        message:
          "Last visited channel not found for space, direct to space default channel",
      });
    }

    return res.status(201).json({ channel });
  } catch (error) {
    next(error);
  }
}

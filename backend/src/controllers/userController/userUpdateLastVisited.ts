import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUser, updateLastVisitedChannel } from "../../utils/db/user";

export default async function userUpdateLastVisited(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { channelId } = req.body;
  const { username } = req.auth?.user;

  try {
    const user = await getUser(username);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const updatedUser = await updateLastVisitedChannel(
      user.id,
      spaceId,
      channelId
    );
    if (!updatedUser) {
      res.status(500);
      throw new Error("Failed to updated last visited channel for space");
    }

    return res
      .status(201)
      .json({ message: "Successfully updated last visited channel" });
  } catch (error) {
    next(error);
  }
}

import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import { addToGroupDm } from "../../utils/db/dm";
import { findFriend } from "../../utils/db/friends";

export default async function dmGroupAdd(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { userId } = req.body;
  const { groupId } = req.params;
  const { id } = req.auth?.user;

  try {
    const isFriend = await findFriend(id, userId);
    if (!isFriend) {
      res.status(403);
      throw new Error(`You must be friends with ${userId} to add to Group DM.`);
    }

    const updatedGroupDm = await addToGroupDm(groupId, userId);

    return res.status(201).json({ updatedGroupDm });
  } catch (error) {
    next(error);
  }
}

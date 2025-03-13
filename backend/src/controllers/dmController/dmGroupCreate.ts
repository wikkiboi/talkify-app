import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import { createGroupDm } from "../../utils/db/dm";
import mongoose from "mongoose";
import findFriend from "../../utils/db/friends/findFriend";

export default async function dmGroupCreate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { participantIds, groupName } = req.body;
  const { id, username } = req.auth?.user;

  try {
    if (!Array.isArray(participantIds) || participantIds.length > 3) {
      res.status(400);
      throw new Error("A group DM must have at least 3 users");
    }

    if (!participantIds.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      res.status(400);
      throw new Error("Invalid participant IDs provided.");
    }

    for (const participantId of participantIds) {
      if (participantId === id) continue;

      const isFriend = await findFriend(id, participantId);
      if (!isFriend) {
        res.status(403);
        throw new Error(
          `You must be friends with ${participantId} to create this Group DM.`
        );
      }
    }

    const groupDmName = groupName ?? `${username}'s Group`;

    const newGroupDm = await createGroupDm(participantIds, id, groupDmName);

    return res.status(201).json({ newGroupDm });
  } catch (error) {
    next(error);
  }
}

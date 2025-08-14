import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import mongoose from "mongoose";
import { findFriend } from "../utils/db/friends";
import { deleteConversationMsgs } from "../utils/db/message";
import {
  addToGroupDm,
  createGroupDm,
  deleteGroupDm,
  getDmMsgs,
  getGroupDm,
  leaveGroupDm,
} from "../utils/db/dm";

/* POST */

export async function dmGroupCreate(
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

/* GET */

export async function dmGroupGet(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { groupId } = req.params;
  const { id } = req.auth?.user;

  try {
    const groupDm = await getGroupDm(groupId, id);
    if (!groupDm) {
      res.status(403);
      throw new Error("User is not a part of the Group DM");
    }

    return res.status(200).json({ groupDm });
  } catch (error) {
    next(error);
  }
}

export async function dmGroupGetMsgs(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { groupId } = req.params;
  const { id } = req.auth?.user;

  try {
    const dm = await getGroupDm(groupId, id);
    if (!dm) {
      res.status(401);
      throw new Error("User is not a part of this DM");
    }

    const dmMsgs = await getDmMsgs(groupId);

    return res.status(200).json({ messages: dmMsgs });
  } catch (error) {
    next(error);
  }
}

/* PUT */

export async function dmGroupAdd(
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

export async function dmGroupLeave(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { groupId } = req.params;
  const { id } = req.auth?.user;

  try {
    const updatedGroupDm = await leaveGroupDm(groupId, id);
    if (!updatedGroupDm) {
      res.status(403);
      throw new Error("User is not a part of the Group DM");
    }

    return res.status(200).json({ updatedGroupDm });
  } catch (error) {
    next(error);
  }
}

/* DELETE */

export async function dmGroupDelete(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { groupId } = req.params;
  const { id } = req.auth?.user;

  try {
    const deletedGroupDm = await deleteGroupDm(groupId, id);
    if (!deletedGroupDm) {
      res.status(401);
      throw new Error("User is not the owner of this group DM");
    }

    const deletedMsgs = await deleteConversationMsgs(groupId);

    return res.status(200).json({ deletedGroupDm, deletedMsgs });
  } catch (error) {
    next(error);
  }
}

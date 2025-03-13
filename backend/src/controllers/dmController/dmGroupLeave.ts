import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import { leaveGroupDm } from "../../utils/db/dm";

export default async function dmGroupLeave(
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

import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import { deleteGroupDm } from "../../utils/db/dm";
import { deleteConversationMsgs } from "../../utils/db/message";

export default async function dmGroupDelete(
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

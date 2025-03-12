import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import { getDm, getGroupDm } from "../../utils/db/dm";

export default async function dmGroupGet(
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

import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import { getDm, getDmMsgs, getGroupDm } from "../../utils/db/dm";

export default async function dmGetMsgs(
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

    return res.status(200).json({ dmMsgs });
  } catch (error) {
    next(error);
  }
}

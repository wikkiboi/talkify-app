import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import { getDm, getDmMsgs } from "../../utils/db/dm";

export default async function dmGetMsgs(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { dmId } = req.params;
  const { id } = req.auth?.user;

  try {
    console.log(id);
    const dm = await getDm(dmId, id);
    if (!dm) {
      res.status(401);
      throw new Error("User is not a part of this DM");
    }

    const dmMsgs = await getDmMsgs(dmId);

    return res.status(200).json({ messages: dmMsgs });
  } catch (error) {
    next(error);
  }
}

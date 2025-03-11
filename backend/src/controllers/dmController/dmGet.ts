import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import { getDm } from "../../utils/db/dm";

export default async function dmGetUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { dmId } = req.params;
  const { id } = req.auth?.user;

  try {
    const dm = await getDm(dmId, id);
    if (!dm) {
      res.status(403);
      throw new Error("User is not in this DM");
    }

    return res.status(200).json({ dm });
  } catch (error) {
    next(error);
  }
}

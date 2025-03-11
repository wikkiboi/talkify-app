import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUserDms, getUserGroupDms } from "../../utils/db/user";

export default async function dmGetAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.auth?.user;

  try {
    const privateDms = await getUserDms(id);
    const groupDms = await getUserGroupDms(id);

    return res.status(200).json({ privateDms, groupDms });
  } catch (error) {
    next(error);
  }
}

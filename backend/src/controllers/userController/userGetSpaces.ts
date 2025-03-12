import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUser } from "../../utils/db/user";
import getUserSpaces from "../../utils/db/user/getUserSpaces";

export default async function userGetSpaces(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { id } = req.auth?.user;
    const user = await getUserSpaces(id);
    if (!user) {
      res.status(404);
      throw new Error("Create Space Error: User not found");
    }

    return res.status(201).json({ spaces: user.spaces });
  } catch (error) {
    next(error);
  }
}

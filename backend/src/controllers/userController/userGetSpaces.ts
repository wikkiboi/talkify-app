import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUser } from "../../utils/db/user";

export default async function userGetSpaces(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { username } = req.auth?.user;
    const user = await getUser(username);
    if (!user) {
      res.status(404);
      throw new Error("Create Space Error: User not found");
    }

    return res.status(201).json({ spaces: user.spaces });
  } catch (error) {
    next(error);
  }
}

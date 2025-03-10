import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUser } from "../../utils/db/user";

export default async function userGetStatus(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { username } = req.auth?.user;
  try {
    const user = await getUser(username);
    if (!user) {
      res.status(404);
      throw new Error("Current user not found");
    }

    return res.status(201).json({
      status: user.status,
    });
  } catch (error) {
    next(error);
  }
}

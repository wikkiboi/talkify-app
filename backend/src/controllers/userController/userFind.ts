import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { findUser } from "../../utils/db/user";

export default async function userFind(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { username } = req.params;
  try {
    console.log(username);
    const user = await findUser(username);
    if (!user) {
      res.status(404);
      throw new Error("Current user not found");
    }

    return res.status(201).json({
      user,
    });
  } catch (error) {
    next(error);
  }
}

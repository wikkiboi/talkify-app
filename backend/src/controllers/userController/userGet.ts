import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUserById } from "../../utils/db/user";

export default async function userGet(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.auth?.user;
  try {
    const user = await getUserById(id);
    if (!user) {
      res.status(404);
      throw new Error("Current user not found");
    }

    return res.status(201).json({
      user: {
        userId: user.id,
        username: user.username,
        friends: user.friends,
        spaces: user.spaces,
        status: user.status,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

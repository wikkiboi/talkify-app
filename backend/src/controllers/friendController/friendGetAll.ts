import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUser, getUserById } from "../../utils/db/user";
import { addFriend } from "../../utils/db/friends";

export default async function friendAdd(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.auth?.user;

  try {
    const user = await getUserById(id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    return res.status(201).json({
      userFriends: user.friends,
    });
  } catch (error) {
    next(error);
  }
}

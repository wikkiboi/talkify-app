import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { findFriend } from "../../utils/db/friends";

export default async function friendGet(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { friendId } = req.params;
  const { id } = req.auth?.user;

  try {
    const friend = await findFriend(id, friendId);
    if (!friend) {
      res.status(400);
      throw new Error("Friend not found");
    }

    return res.status(201).json({
      userFriend: friend,
    });
  } catch (error) {
    next(error);
  }
}

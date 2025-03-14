import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUser, getUserById } from "../../utils/db/user";
import { findFriend, removeFriend } from "../../utils/db/friends";

export default async function friendDelete(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { friendId } = req.params;
  const { id } = req.auth?.user;

  try {
    const friend = await findFriend(id, friendId);
    if (!friend) {
      res.status(404);
      throw new Error("Friend user not found");
    }

    const { user: updatedUser, friend: updatedFriend } = await removeFriend(
      id,
      friendId
    );

    if (!updatedUser) {
      res.status(500);
      throw new Error(
        "Failed to delete friend. Friend may already be deleted. Try again later"
      );
    }
    if (!updatedFriend) {
      res.status(500);
      throw new Error("Failed to remove friend on friend's side");
    }

    return res.status(201).json({
      message: `Successfully removed ${updatedFriend.username} as a friend`,
      userFriends: updatedUser.friends,
    });
  } catch (error) {
    next(error);
  }
}

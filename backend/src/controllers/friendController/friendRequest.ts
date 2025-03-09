import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUser, getUserById } from "../../utils/db/user";
import { findFriend, sendFriendRequest } from "../../utils/db/friends";

export default async function friendRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { friendId } = req.params;
  const { id, username } = req.auth?.user;

  try {
    if (friendId === id) {
      res.status(400);
      throw new Error("Cannot add yourself as a friend");
    }

    const existingFriend = await findFriend(id, friendId);
    if (existingFriend) {
      res.status(400);
      throw new Error(
        "Already friends or friend request already sent/received from user"
      );
    }

    const { user: updatedUser, friend: updatedFriend } =
      await sendFriendRequest(id, username, friendId);
    if (!updatedFriend) {
      res.status(404);
      throw new Error("No user to send request to");
    }

    if (!updatedUser) {
      res.status(500);
      throw new Error("Failed to send request");
    }

    return res.status(201).json({
      message: `Successfully sent friend request to ${updatedFriend.username}`,
      userFriends: updatedUser.friends,
    });
  } catch (error) {
    next(error);
  }
}

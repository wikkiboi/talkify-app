import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { findFriendRequest, removeFriend } from "../../utils/db/friends";

export default async function friendDeny(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { friendId } = req.params;
  const { id } = req.auth?.user;

  try {
    const friend = await findFriendRequest(id, friendId);
    if (!friend) {
      res.status(404);
      throw new Error("Friend request not found");
    }

    const { user: updatedUser, friend: updatedFriend } = await removeFriend(
      id,
      friendId
    );
    if (!updatedUser) {
      res.status(500);
      throw new Error(
        "Failed to delete request. Request may already be deleted. Try again later"
      );
    }
    if (!updatedFriend) {
      res.status(500);
      throw new Error("Failed to remove request on friend's side");
    }

    console.log(friend, updatedFriend);

    return res.status(201).json({
      message: `Denied ${updatedFriend.username} as a friend`,
      userFriends: updatedUser.friends,
    });
  } catch (error) {
    next(error);
  }
}

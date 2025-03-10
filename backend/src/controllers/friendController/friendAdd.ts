import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { addFriend, findFriendRequest } from "../../utils/db/friends";

export default async function friendAdd(
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
      throw new Error("No friend request received from this user");
    }

    const { user: updatedUser, friend: updatedFriend } = await addFriend(
      id,
      friendId,
      friend.username,
      friend.status
    );
    if (!updatedUser) {
      res.status(500);
      throw new Error("Failed to accept request, try again later");
    }
    if (!updatedFriend) {
      res.status(500);
      throw new Error("Friend failed to receive accept");
    }

    return res.status(201).json({
      message: `Successfully add ${updatedFriend.username} as a friend`,
      userFriends: updatedUser.friends,
    });
  } catch (error) {
    next(error);
  }
}

import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { createDm, findUserDm } from "../utils/db/dm";
import { getUserById } from "../utils/db/user";
import {
  addFriend,
  findFriend,
  findFriendRequest,
  findPendingRequest,
  removeFriend,
  sendFriendRequest,
} from "../utils/db/friends";

/* POST */

export async function friendRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { friendId } = req.body;
  const { id } = req.auth?.user;

  try {
    if (friendId === id) {
      res.status(400);
      throw new Error("Cannot add yourself as a friend");
    }

    const existingFriend = await findFriend(id, friendId);
    if (existingFriend) {
      res.status(400);
      throw new Error("Already friends with this user");
    }

    const pendingRequest = await findPendingRequest(id, friendId);
    if (pendingRequest) {
      res.status(400);
      throw new Error("Pending request already exists with this user");
    }

    const existingRequest = await findFriendRequest(id, friendId);
    if (existingRequest) {
      res.status(400);
      throw new Error("Already sent friend request to this user");
    }

    console.log(friendId);

    const { user: updatedUser, friend: updatedFriend } =
      await sendFriendRequest(id, friendId);
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

/* GET */

export async function friendGet(
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

export async function friendGetAll(
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

/* PUT */

export async function friendAdd(
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
      friendId
    );
    if (!updatedUser) {
      res.status(500);
      throw new Error("Failed to accept request, try again later");
    }
    if (!updatedFriend) {
      res.status(500);
      throw new Error("Friend failed to receive accept");
    }

    let dm;
    const existingDm = await findUserDm(id, friendId);
    if (!existingDm) {
      const newDm = await createDm(id, friendId);
      if (!newDm) {
        res.status(500);
        throw new Error("Failed to create DM");
      }
      dm = newDm;
    } else {
      dm = existingDm;
    }

    return res.status(201).json({
      message: `Successfully add ${updatedFriend.username} as a friend`,
      userFriends: updatedUser.friends,
      dm,
    });
  } catch (error) {
    next(error);
  }
}

/* DELETE */

export async function friendDelete(
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

export async function friendDeny(
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

import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import {
  findUser,
  getUser,
  getUserById,
  getUserSpaces,
  getUserLastChannel,
  updateLastVisitedChannel,
} from "../utils/db/user";

/* GET */

export async function userFind(
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

export async function userGet(
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
      userId: user.id,
      username: user.username,
      friends: user.friends,
      spaces: user.spaces,
      status: user.status,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
}

export async function userGetLastVisited(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { username } = req.auth?.user;

  try {
    const user = await getUser(username);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const channel = await getUserLastChannel(user.id, spaceId);
    if (!channel) {
      return res.status(201).json({
        message:
          "Last visited channel not found for space, direct to space default channel",
        channel: null,
      });
    }

    return res.status(201).json({ channel });
  } catch (error) {
    next(error);
  }
}

export async function userGetSpaces(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { id } = req.auth?.user;
    const user = await getUserSpaces(id);
    if (!user) {
      res.status(404);
      throw new Error("Create Space Error: User not found");
    }

    return res.status(201).json({ spaces: user.spaces });
  } catch (error) {
    next(error);
  }
}

export async function userGetStatus(
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

/* PUT */

export async function userUpdateLastVisited(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { channelId } = req.body;
  const { username } = req.auth?.user;

  try {
    const user = await getUser(username);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const updatedUser = await updateLastVisitedChannel(
      user.id,
      spaceId,
      channelId
    );
    if (!updatedUser) {
      res.status(500);
      throw new Error("Failed to updated last visited channel for space");
    }

    return res
      .status(201)
      .json({ message: "Successfully updated last visited channel" });
  } catch (error) {
    next(error);
  }
}

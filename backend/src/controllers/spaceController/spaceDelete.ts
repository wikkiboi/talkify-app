import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUser, deleteUserSpace } from "../../utils/db/user";
import { getSpaceOwner, deleteSpaceChannels } from "../../utils/db/space";

export default async function spaceDelete(
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
      throw new Error("Create Space Error: User not found");
    }

    const space = await getSpaceOwner(spaceId, user.id);
    if (!space) {
      res.status(401);
      throw new Error("User is not the owner of this space");
    }

    await space.deleteOne();
    await deleteSpaceChannels(spaceId);
    const updatedUser = await deleteUserSpace(spaceId, user.id);
    if (!updatedUser) {
      res.status(500);
      throw new Error("Failed to delete space in User object");
    }

    return res.status(201).json({ spaces: updatedUser.spaces });
  } catch (error) {
    return next(error);
  }
}

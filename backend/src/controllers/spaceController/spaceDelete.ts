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
  const { id } = req.auth?.user;
  try {
    const space = await getSpaceOwner(spaceId, id);
    if (!space) {
      res.status(401);
      throw new Error("User is not the owner of this space");
    }

    await space.deleteOne();
    await deleteSpaceChannels(spaceId);
    const updatedUser = await deleteUserSpace(spaceId, id);
    if (!updatedUser) {
      res.status(400);
      throw new Error("Space deleted, but space is not found in user spaces");
    }

    return res.status(201).json({ spaces: updatedUser.spaces });
  } catch (error) {
    return next(error);
  }
}

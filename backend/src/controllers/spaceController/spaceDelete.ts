import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { createSpace } from "../../utils/db/space";
import { getUser } from "../../utils/db/user";
import getSpaceOwner from "../../utils/db/space/getSpaceOwner";
import deleteUserSpace from "../../utils/db/user/deleteUserSpace";
import deleteSpaceChannels from "../../utils/db/space/deleteSpaceChannels";

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
    await deleteUserSpace(spaceId, user.id);

    return res.status(201).json({ message: "Successfully deleted space" });
  } catch (error) {
    return next(error);
  }
}

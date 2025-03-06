import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUser } from "../../utils/db/user";
import deleteUserSpace from "../../utils/db/user/deleteUserSpace";
import deleteSpaceChannels from "../../utils/db/space/deleteSpaceChannels";
import getSpaceAdmin from "../../utils/db/space/getSpaceAdmin";
import updateSpace from "../../utils/db/space/updateSpace";
import isHexColor from "../../utils/isHexColor";
import updateUserSpace from "../../utils/db/user/updateUserSpace";

export default async function spaceUpdate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { username } = req.auth?.user;
  const { name, color } = req.body;
  try {
    if (!name && !color) {
      res.status(401);
      throw new Error("Nothing passed in to update space");
    }

    if (color && !isHexColor(color)) {
      res.status(401);
      throw new Error("Not a valid hex color");
    }

    const user = await getUser(username);
    if (!user) {
      res.status(404);
      throw new Error("Create Space Error: User not found");
    }

    const space = await getSpaceAdmin(spaceId, user.id);
    if (!space) {
      res.status(402);
      throw new Error("User is not an admin of this space");
    }

    const spaceName = name ?? space.name;
    const spaceColor = color ?? space.color;

    await updateSpace(space.id, spaceName, spaceColor);
    const updatedUser = await updateUserSpace(
      user.id,
      space.id,
      spaceName,
      spaceColor
    );
    if (!updatedUser) {
      res.status(401);
      throw new Error("Failed to updated space name in User object");
    }

    return res.status(201).json({ spaces: updatedUser.spaces });
  } catch (error) {
    return next(error);
  }
}

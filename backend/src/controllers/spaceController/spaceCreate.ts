import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { createSpace } from "../../utils/db/space";
import { getUser, addUserSpace } from "../../utils/db/user";
import { createChannel } from "../../utils/db/channel";
import isHexColor from "../../utils/isHexColor";

export default async function spaceCreate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { name, color } = req.body;
  const { id, username } = req.auth?.user;
  try {
    if (!name) {
      res.status(400);
      throw new Error("Please add a name for the Space");
    }
    if (color && !isHexColor(color)) {
      res.status(400);
      throw new Error("Not a valid hex color");
    }

    console.log(name, id, username, color);

    const space = await createSpace(name, id, username, color);
    if (!space) {
      res.status(401);
      throw new Error("Create Space Error: User ID not found");
    }

    const channel = await createChannel("general", space.id);
    if (!channel) {
      res.status(500);
      throw new Error(`Create Channel Error`);
    }

    space.defaultChannel = channel._id;
    await space.save();

    const updatedUser = await addUserSpace(id, space.id, space.name);

    return res.status(201).json({ space, updatedUser });
  } catch (error) {
    return next(error);
  }
}

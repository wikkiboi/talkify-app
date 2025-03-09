import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { createSpace } from "../../utils/db/space";
import { getUser, addUserSpace } from "../../utils/db/user";
import { createChannel } from "../../utils/db/channel";

export default async function spaceCreate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { name } = req.body;
  const { username } = req.auth?.user;
  try {
    if (!name) {
      res.status(400);
      throw new Error("Please add a name for the Space");
    }

    const user = await getUser(username);
    if (!user) {
      res.status(404);
      throw new Error("Create Space Error: User not found");
    }

    const space = await createSpace(name, user._id, user.username);
    if (!space) {
      res.status(401);
      throw new Error("Create Space Error: User ID not found");
    }

    const channel = await createChannel("general", space.id);
    if (!channel) {
      res.status(500);
      throw new Error(`Create Channel Error`);
    }

    const updatedUser = await addUserSpace(user.id, space.id, space.name);

    return res.status(201).json({ space, updatedUser });
  } catch (error) {
    return next(error);
  }
}

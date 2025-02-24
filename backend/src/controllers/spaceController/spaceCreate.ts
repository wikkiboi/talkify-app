import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { createSpace } from "../../utils/db/space";
import { getUser } from "../../utils/db/user";

export default async function spaceCreate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { name } = req.body;
  const { username } = req.auth?.user;
  try {
    if (!name) {
      throw new Error("Please add a name for the Space");
    }

    const user = await getUser(username);
    if (!user) {
      res.status(404);
      throw new Error("Create Space Error: User not found");
    }

    console.log(user);
    const space = createSpace(name, user.id);
    if (!space) {
      res.status(401);
      throw new Error("Create Space Error: User ID not found");
    }
    return res.status(201).json(space);
  } catch (error) {
    return next(error);
  }
}

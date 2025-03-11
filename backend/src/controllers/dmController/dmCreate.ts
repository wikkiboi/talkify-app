import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import { createDm, findUserDm } from "../../utils/db/dm";
import { userExists } from "../../utils/db/user";

export default async function dmCreate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { userId } = req.params;
  const { id } = req.auth?.user;

  try {
    if (userId === id) {
      res.status(400);
      throw new Error("Cannot DM yourself");
    }
    const existingDm = await findUserDm(id, userId);
    if (existingDm) {
      res.status(400);
      throw new Error("DM with this user already exists");
    }

    const validUser = await userExists(userId);
    if (!validUser) {
      res.status(404);
      throw new Error("This user does not exist");
    }

    const dm = await createDm(id, userId);
    if (!dm) {
      res.status(500);
      throw new Error("Failed to create DM");
    }

    return res.status(201).json({ dm });
  } catch (error) {
    next(error);
  }
}

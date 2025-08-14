import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import { createDm, findUserDm, getDm, getDmMsgs } from "../utils/db/dm";
import { getUserDms, getUserGroupDms, userExists } from "../utils/db/user";

/* POST */

export async function dmCreate(
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

/* GET */

export async function dmGetUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { dmId } = req.params;
  const { id } = req.auth?.user;

  try {
    const dm = await getDm(dmId, id);
    if (!dm) {
      res.status(403);
      throw new Error("User is not in this DM");
    }

    return res.status(200).json({ dm });
  } catch (error) {
    next(error);
  }
}

export async function dmGetAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.auth?.user;

  try {
    const privateDms = await getUserDms(id);
    const groupDms = await getUserGroupDms(id);

    return res.status(200).json({ privateDms, groupDms });
  } catch (error) {
    next(error);
  }
}

export async function dmGetMsgs(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { dmId } = req.params;
  const { id } = req.auth?.user;

  try {
    console.log(id);
    const dm = await getDm(dmId, id);
    if (!dm) {
      res.status(401);
      throw new Error("User is not a part of this DM");
    }

    const dmMsgs = await getDmMsgs(dmId);

    return res.status(200).json({ messages: dmMsgs });
  } catch (error) {
    next(error);
  }
}

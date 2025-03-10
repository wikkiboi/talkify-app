import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getUser } from "../../utils/db/user";
import { getSpaceAdmin, createInviteCode } from "../../utils/db/space";

export default async function spaceInvite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.auth?.user;
  const { spaceId } = req.params;
  const { expiration, maxUses } = req?.body;

  try {
    if (
      (expiration && typeof expiration !== "number") ||
      (maxUses && typeof maxUses !== "number")
    ) {
      res.status(400);
      throw new Error("Invalid expiration or use limit");
    }

    const space = await getSpaceAdmin(spaceId, id);
    if (!space) {
      res.status(401);
      throw new Error("User is not an admin of the space");
    }

    const invite = await createInviteCode(space.id, expiration, maxUses);
    if (!invite) {
      res.status(500);
      throw new Error("Failed to created invite code");
    }

    res.status(201).json({ invite: invite.invites });
  } catch (error) {
    next(error);
  }
}

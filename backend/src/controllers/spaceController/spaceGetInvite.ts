import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import getInviteCodes from "../../utils/db/space/getInviteCodes";

export default async function spaceGetInvite(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { id } = req.auth?.user;

  try {
    const space = await getInviteCodes(spaceId, id);
    if (!space) {
      res.status(404);
      throw new Error("Space not found or user not in space");
    }

    const validInvites = space.invites.filter(
      (invite) => invite.expiresAt && new Date(invite.expiresAt) > new Date()
    );

    return res.status(201).json({
      invites: validInvites,
    });
  } catch (error) {
    next(error);
  }
}

import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { addUserSpace, deleteUserSpace, getUser } from "../../utils/db/user";
import { addSpaceMember, findInviteCode, getSpace } from "../../utils/db/space";
import removeSpaceMember from "../../utils/db/space/removeSpaceMember";

export default async function spaceLeave(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { id } = req.auth?.user;

  try {
    const updatedSpace = await removeSpaceMember(id, spaceId);
    if (!updatedSpace) {
      res.status(400);
      throw new Error("User not found in space");
    }

    const updatedUser = await deleteUserSpace(id, updatedSpace.id);
    if (!updatedUser) {
      res.status(500);
      throw new Error("Failed to update user spaces");
    }

    const io = await req.app.get("io");
    io.to(updatedSpace.id.toString()).emit("spaceMemberUpdate", {
      spaceId: updatedSpace.id,
      members: updatedSpace.members,
    });

    return res.status(200).json({
      space: updatedSpace,
      userSpaces: updatedUser.spaces,
    });
  } catch (error) {
    next(error);
  }
}

import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { addUserSpace, getUser } from "../../utils/db/user";
import { addSpaceMember, findInviteCode } from "../../utils/db/space";

export default async function spaceJoin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { username } = req.auth?.user;
  const { inviteCode } = req.body ?? req.params;

  try {
    const user = await getUser(username);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const spaceInfo = await findInviteCode(inviteCode);
    if (!spaceInfo || !spaceInfo.invite) {
      res.status(401);
      throw new Error("Could not find matching space invite code");
    }

    const { space, invite } = spaceInfo;

    if (new Date() > invite.expiresAt) {
      res.status(400);
      throw new Error("Invite code expired");
    }

    if (invite.maxUses && invite.uses >= invite.maxUses) {
      res.status(400);
      throw new Error("Invite code has reached max uses");
    }

    if (space.members.some((m) => m.userId.toString() === user.id)) {
      res.status(400);
      throw new Error("User is already a member");
    }

    const updatedSpace = await addSpaceMember(
      space.id,
      inviteCode,
      user.id,
      user.username,
      user?.status
    );
    if (!updatedSpace) {
      res.status(500);
      throw new Error("Failed to add user to space");
    }

    const updatedUser = await addUserSpace(user.id, space.id, space.name);
    if (!updatedUser) {
      res.status(500);
      throw new Error("Failed to update user spaces");
    }

    const io = await req.app.get("io");
    io.to(space.id.toString()).emit("spaceMemberUpdate", {
      spaceId: space.id,
      members: space.members,
    });

    return res.status(200).json({
      space: updatedSpace,
      userSpaces: updatedUser.spaces,
    });
  } catch (error) {
    next(error);
  }
}

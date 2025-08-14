import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import isHexColor from "../utils/isHexColor";
import { createChannel } from "../utils/db/channel";
import {
  getUser,
  addUserSpace,
  deleteUserSpace,
  updateUserSpace,
} from "../utils/db/user";
import {
  addSpaceMember,
  createInviteCode,
  createSpace,
  deleteSpaceChannels,
  findInviteCode,
  getInviteCodes,
  getSpace,
  getSpaceAdmin,
  getSpaceChannels,
  getSpaceOwner,
  removeSpaceMember,
  updateSpace,
} from "../utils/db/space";

/* POST */

export async function spaceCreate(
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

export async function spaceInvite(
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

/* GET */

export async function spaceGet(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { id } = req.auth?.user;

  try {
    const space = await getSpace(spaceId, id);
    if (!space) {
      res.status(404);
      throw new Error("Space not found or user not in space");
    }

    const spaceChannels = await getSpaceChannels(space.id);
    if (!spaceChannels) {
      res.status(404);
      throw new Error("No channels found in Space");
    }

    return res.status(201).json({
      space,
      channels: spaceChannels,
    });
  } catch (error) {
    next(error);
  }
}

export async function spaceGetChannels(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { username } = req.auth?.user;

  try {
    const space = await getSpace(spaceId, username);
    if (!space) {
      res.status(404);
      throw new Error("Space not found or user not in space");
    }

    const spaceChannels = await getSpaceChannels(space.id);
    if (!spaceChannels) {
      res.status(404);
      throw new Error("No channels found in Space");
    }

    return res.status(201).json({
      channels: spaceChannels,
    });
  } catch (error) {
    next(error);
  }
}

export async function spaceGetInvite(
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

/* PUT */

export async function spaceUpdate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { id } = req.auth?.user;
  const { name, color } = req.body;
  try {
    if (!name && !color) {
      res.status(400);
      throw new Error("Nothing passed in to update space");
    }

    if (color && !isHexColor(color)) {
      res.status(400);
      throw new Error("Not a valid hex color");
    }

    const space = await getSpaceAdmin(spaceId, id);
    if (!space) {
      res.status(401);
      throw new Error("User is not an admin of this space");
    }

    const spaceName = name ?? space.name;
    const spaceColor = color ?? space.color;

    const updatedSpace = await updateSpace(space.id, spaceName, spaceColor);
    if (!updatedSpace) {
      res.status(500);
      throw new Error("Failed to update space name");
    }
    const updatedUser = await updateUserSpace(
      id,
      space.id,
      spaceName,
      spaceColor
    );
    if (!updatedUser) {
      res.status(500);
      throw new Error("Failed to update space name in User object");
    }

    return res
      .status(201)
      .json({ userSpaces: updatedUser.spaces, space: updatedSpace });
  } catch (error) {
    return next(error);
  }
}

export async function spaceJoin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id, username } = req.auth?.user;
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

    if (space.members.some((member) => member.userId.toString() === id)) {
      res.status(400);
      throw new Error("User is already a member");
    }

    const updatedSpace = await addSpaceMember(
      space.id,
      inviteCode,
      user.id,
      user.username,
      user.status
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

export async function spaceLeave(
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

/* DELETE */

export async function spaceDelete(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { id } = req.auth?.user;
  try {
    const space = await getSpaceOwner(spaceId, id);
    if (!space) {
      res.status(401);
      throw new Error("User is not the owner of this space");
    }

    await space.deleteOne();
    await deleteSpaceChannels(spaceId);
    const updatedUser = await deleteUserSpace(spaceId, id);
    if (!updatedUser) {
      res.status(400);
      throw new Error("Space deleted, but space is not found in user spaces");
    }

    return res.status(201).json({ spaces: updatedUser.spaces });
  } catch (error) {
    return next(error);
  }
}

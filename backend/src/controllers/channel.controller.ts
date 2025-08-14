import { Response, NextFunction } from "express";
import { Request } from "express-jwt";
import parseTimestamp from "../utils/parseTimestamp";
import { getUser } from "../utils/db/user";
import { createMsg } from "../utils/db/message";
import { getSpace, getSpaceAdmin } from "../utils/db/space";
import {
  findChannelByName,
  createChannel,
  deleteChannel,
  findChannelInSpace,
  getChannel,
  findChannelById,
  updateChannel,
  getChannelMsgs,
} from "../utils/db/channel";

/* POST */

export async function channelCreate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId } = req.params;
  const { name, defaultChannel } = req.body;
  const { id } = req.auth?.user;
  try {
    if (!name) {
      res.status(400);
      throw new Error("Please add a name to channel");
    }

    const space = await getSpace(spaceId, id);
    if (!space) {
      res.status(404);
      throw new Error("Space not found");
    }

    const existingChannel = await findChannelByName(name, space.id);
    if (existingChannel) {
      res.status(400);
      throw new Error("Channel already exists");
    }

    const channel = await createChannel(name, space.id);
    if (!channel) {
      res.status(500);
      throw new Error("Failed to create channel");
    }

    if (
      !space.defaultChannel ||
      defaultChannel === true ||
      defaultChannel === "true"
    ) {
      space.defaultChannel = channel._id;
      await space.save();
    }

    return res.status(201).json({ channel });
  } catch (error) {
    return next(error);
  }
}

export async function channelSendMsg(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { channelId } = req.params;
  const { text } = req.body;
  const { id, username } = req.auth?.user;

  try {
    if (!text) {
      res.status(400);
      throw new Error("Channel Msg Send Error: No text body");
    }

    const channelExists = await findChannelById(channelId);
    if (!channelExists) {
      res.status(404);
      throw new Error("Channel not found");
    }

    const newMsg = await createMsg(username, id, text);
    if (!newMsg) {
      res.status(500);
      throw new Error("Message Error: Failed to create message");
    }

    const timestamp = await parseTimestamp(newMsg.id);

    const io = req.app.get("io");
    io.to(channelId).emit("receive-message", {
      _id: newMsg.id,
      sender: {
        username: newMsg.sender.username,
        userId: newMsg.sender._id.toString(),
      },
      text: newMsg.text,
      timestamp,
    });

    return res.status(201).json({ newMsg });
  } catch (error) {
    return next(error);
  }
}

/* GET */

export async function channelGet(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId, channelId } = req.params;
  const { id } = req.auth?.user;

  try {
    const space = await getSpace(spaceId, id);
    if (!space) {
      res.status(404);
      throw new Error("Space not found or user not in space");
    }

    const channel = await getChannel(channelId);
    if (!channel || channel.spaceId.toString() !== spaceId) {
      res.status(400);
      throw new Error("Invalid channel for this space");
    }

    return res.status(200).json({ channel });
  } catch (error) {
    return next(error);
  }
}

export async function channelGetMsgs(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId, channelId } = req.params;
  const { id } = req.auth?.user;

  try {
    const space = await getSpace(spaceId, id);
    if (!space) {
      res.status(404);
      throw new Error("Space not found or user not in space");
    }

    const channelMsgs = await getChannelMsgs(channelId);
    if (!channelMsgs) {
      res.status(404);
      throw new Error("Channel not found");
    }

    return res.status(200).json({ messages: channelMsgs });
  } catch (error) {
    return next(error);
  }
}

/* PUT */

export async function channelUpdateDefault(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId, channelId } = req.params;
  const { username } = req.auth?.user;

  try {
    if (!channelId) {
      res.status(400);
      throw new Error("No channel passed in to update");
    }

    const user = await getUser(username);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const space = await getSpaceAdmin(spaceId, user.id);
    if (!space) {
      res.status(404);
      throw new Error("User is not the admin of this space");
    }

    if (space.defaultChannel && space.defaultChannel.toString() === channelId) {
      res.status(400);
      throw new Error("This channel is already the default channel");
    }

    const channel = await getChannel(channelId);
    if (!channel || channel.spaceId.toString() !== spaceId) {
      res.status(400);
      throw new Error("Invalid channel for this space");
    }

    space.defaultChannel = channel._id;
    await space.save();

    return res.status(201).json({ channel });
  } catch (error) {
    return next(error);
  }
}

export async function channelUpdateName(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId, channelId } = req.params;
  const { name } = req.body;
  const { id } = req.auth?.user;
  try {
    if (!spaceId || !channelId) {
      res.status(400);
      throw new Error("No space or channel id found in params");
    }
    if (!name) {
      res.status(400);
      throw new Error("Please pass in a name");
    }

    const space = await getSpaceAdmin(spaceId, id);
    if (!space) {
      res.status(401);
      throw new Error("User is not the admin of this space");
    }

    const channel = await updateChannel(spaceId, channelId, name);
    if (!channel) {
      res.status(500);
      throw new Error("Failed to update channel");
    }

    return res.status(201).json({ channel });
  } catch (error) {
    return next(error);
  }
}

/* DELETE */

export async function channelDelete(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId, channelId } = req.params;
  const { id } = req.auth?.user;
  try {
    if (!spaceId || !channelId) {
      res.status(401);
      throw new Error("No space or channel id found in params");
    }

    const space = await getSpaceAdmin(spaceId, id);
    if (!space) {
      res.status(401);
      throw new Error("User is not the admin of this space");
    }

    const channel = await deleteChannel(space.id, channelId);
    if (!channel) {
      res.status(500);
      throw new Error("Failed to delete channel");
    }

    if (space.defaultChannel?.toString() === channel.id) {
      const otherChannel = await findChannelInSpace(space.id);

      space.defaultChannel = otherChannel?._id ?? null;
      await space.save();
    }

    return res.status(201).json({ channel });
  } catch (error) {
    return next(error);
  }
}

import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { getSpaceAdmin } from "../../utils/db/space";
import { getChannel } from "../../utils/db/channel";
import { getUser } from "../../utils/db/user";

export default async function channelUpdateDefault(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { spaceId, channelId } = req.params;
  const { channelIdInput } = req.body;
  const { username } = req.auth?.user;

  try {
    const newDefaultChannelId = channelIdInput ?? channelId;

    if (!newDefaultChannelId) {
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

    if (
      space.defaultChannel &&
      space.defaultChannel.toString() === newDefaultChannelId
    ) {
      res.status(400);
      throw new Error("This channel is already the default channel");
    }

    const channel = await getChannel(newDefaultChannelId);
    if (!channel || channel.spaceId.toString() !== spaceId) {
      res.status(400);
      throw new Error("Invalid channel for this space");
    }

    space.defaultChannel = channel._id;
    await space.save();

    return res
      .status(201)
      .json({ message: "Successfully updated default channel", channel });
  } catch (error) {
    return next(error);
  }
}

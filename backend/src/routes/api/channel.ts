import { Router } from "express";
import { authenticate } from "../../middleware/auth/authenticator";
import {
  channelCreate,
  channelSendMsg,
  channelGetMsgs,
  channelDelete,
  channelGet,
  channelUpdateName,
  channelUpdateDefault,
} from "../../controllers/channel.controller";

const channelRouter = Router();

// GET
channelRouter.get("/:spaceId/:channelId/msgs", authenticate, channelGetMsgs);
channelRouter.get("/:spaceId/:channelId", authenticate, channelGet);

// POST
channelRouter.post("/:spaceId/create", authenticate, channelCreate);
channelRouter.post("/:channelId/send", authenticate, channelSendMsg);

// PUT
channelRouter.put(
  "/:spaceId/:channelId/update/name",
  authenticate,
  channelUpdateName
);
channelRouter.put(
  "/:spaceId/:channelId/update/default",
  authenticate,
  channelUpdateDefault
);

// DELETE
channelRouter.delete(
  "/:spaceId/:channelId/delete",
  authenticate,
  channelDelete
);

export default channelRouter;

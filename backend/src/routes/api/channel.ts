import { Router } from "express";
import {
  channelCreate,
  channelSendMsg,
  channelGetMsgs,
  channelDelete,
  channelGet,
  channelUpdateName,
  channelUpdateDefault,
} from "../../controllers/channelController";
import { authenticate } from "../../middleware/auth/authenticator";

const channelRouter = Router();

// GET
channelRouter.get("/:spaceId/:channelId/msgs", authenticate, channelGetMsgs);
channelRouter.get("/:spaceId/:channelId", authenticate, channelGet);

// POST
channelRouter.post("/:spaceId/create", authenticate, channelCreate);
channelRouter.post("/:channelId/send", authenticate, channelSendMsg);

// DELETE
channelRouter.delete(
  "/:spaceId/:channelId/delete",
  authenticate,
  channelDelete
);

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

export default channelRouter;

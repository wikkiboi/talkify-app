import { Router } from "express";
import {
  channelCreate,
  channelSendMsg,
  channelGetMsgs,
  channelDelete,
  channelUpdate,
} from "../../controllers/channelController";
import { authenticate } from "../../middleware/auth/authenticator";

const channelRouter = Router();

channelRouter.post("/:spaceId/create", authenticate, channelCreate);
channelRouter.post("/:channelId/send", authenticate, channelSendMsg);
channelRouter.get("/:spaceId/:channelId", authenticate, channelGetMsgs);
channelRouter.delete(
  "/:spaceId/:channelId/delete",
  authenticate,
  channelDelete
);
channelRouter.put("/:spaceId/:channelId/update", authenticate, channelUpdate);
export default channelRouter;

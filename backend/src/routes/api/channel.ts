import { Router } from "express";
import {
  channelCreate,
  channelSendMsg,
} from "../../controllers/channelController";
import { authenticate } from "../../middleware/auth/authenticator";
import channelGetMsgs from "../../controllers/channelController/channelGetMsgs";

const channelRouter = Router();

channelRouter.post("/:spaceId/create", authenticate, channelCreate);
channelRouter.post("/:channelId/send", authenticate, channelSendMsg);
channelRouter.get("/:spaceId/:channelId", authenticate, channelGetMsgs);
export default channelRouter;

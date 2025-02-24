import { Router } from "express";
import {
  channelCreate,
  channelSendMsg,
} from "../../controllers/channelController";
import { authenticate } from "../../middleware/auth/authenticator";

const channelRouter = Router();

channelRouter.post("/create", authenticate, channelCreate);
channelRouter.post("/:channelId/send", authenticate, channelSendMsg);
export default channelRouter;

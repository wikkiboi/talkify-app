import { Router } from "express";
import {
  channelCreate,
  channelSendMsg,
} from "../../controllers/channelController";

const channelRouter = Router();

channelRouter.post("/create", channelCreate);
channelRouter.post("/:channelId/send", channelSendMsg);
export default channelRouter;

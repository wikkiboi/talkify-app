import { Router } from "express";
import { channelCreate } from "../../controllers/channelController";

const channelRouter = Router();

channelRouter.post("/create", channelCreate);

export default channelRouter;

import { Router } from "express";
import {
  spaceCreate,
  spaceGet,
  spaceDelete,
  spaceUpdate,
  spaceInvite,
  spaceJoin,
} from "../../controllers/spaceController";
import { authenticate } from "../../middleware/auth/authenticator";

const spaceRouter = Router();

spaceRouter.post("/create", authenticate, spaceCreate);
spaceRouter.post("/:spaceId/invite", authenticate, spaceInvite);
spaceRouter.post("/:spaceId/join", authenticate, spaceJoin);
spaceRouter.get("/:spaceId", authenticate, spaceGet);
spaceRouter.delete("/:spaceId/delete", authenticate, spaceDelete);
spaceRouter.put("/:spaceId/update", authenticate, spaceUpdate);
export default spaceRouter;

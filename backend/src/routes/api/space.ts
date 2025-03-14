import { Router } from "express";
import {
  spaceCreate,
  spaceGet,
  spaceDelete,
  spaceUpdate,
  spaceInvite,
  spaceJoin,
  spaceGetChannels,
  spaceLeave,
  spaceGetInvite,
} from "../../controllers/spaceController";
import { authenticate } from "../../middleware/auth/authenticator";

const spaceRouter = Router();

// POST
spaceRouter.post("/create", authenticate, spaceCreate);
spaceRouter.post("/join", authenticate, spaceJoin);
spaceRouter.post("/:spaceId/invite", authenticate, spaceInvite);

// GET
spaceRouter.get("/:spaceId", authenticate, spaceGet);
spaceRouter.get("/:spaceId/channels", authenticate, spaceGetChannels);
spaceRouter.get("/:spaceId/invites", authenticate, spaceGetInvite);

// DELETE
spaceRouter.delete("/:spaceId/delete", authenticate, spaceDelete);
spaceRouter.delete("/:spaceId/leave", authenticate, spaceLeave);

// PUT
spaceRouter.put("/:spaceId/update", authenticate, spaceUpdate);

export default spaceRouter;

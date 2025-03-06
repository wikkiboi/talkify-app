import { Router } from "express";
import {
  spaceCreate,
  spaceGet,
  spaceDelete,
  spaceUpdate,
} from "../../controllers/spaceController";
import { authenticate } from "../../middleware/auth/authenticator";

const spaceRouter = Router();

spaceRouter.post("/create", authenticate, spaceCreate);
spaceRouter.get("/:spaceId", authenticate, spaceGet);
spaceRouter.delete("/:spaceId/delete", authenticate, spaceDelete);
spaceRouter.put("/:spaceId/update", authenticate, spaceUpdate);
export default spaceRouter;

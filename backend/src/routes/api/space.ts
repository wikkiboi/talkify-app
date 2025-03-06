import { Router } from "express";
import { spaceCreate } from "../../controllers/spaceController";
import { authenticate } from "../../middleware/auth/authenticator";
import spaceGet from "../../controllers/spaceController/spaceGet";
import spaceDelete from "../../controllers/spaceController/spaceDelete";
import spaceUpdate from "../../controllers/spaceController/spaceUpdate";

const spaceRouter = Router();

spaceRouter.post("/create", authenticate, spaceCreate);
spaceRouter.get("/:spaceId", authenticate, spaceGet);
spaceRouter.delete("/:spaceId/delete", authenticate, spaceDelete);
spaceRouter.put("/:spaceId/update", authenticate, spaceUpdate);
export default spaceRouter;

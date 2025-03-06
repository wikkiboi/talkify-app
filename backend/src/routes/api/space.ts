import { Router } from "express";
import { spaceCreate } from "../../controllers/spaceController";
import { authenticate } from "../../middleware/auth/authenticator";
import spaceGet from "../../controllers/spaceController/spaceGet";
import spaceDelete from "../../controllers/spaceController/spaceDelete";

const spaceRouter = Router();

spaceRouter.post("/create", authenticate, spaceCreate);
spaceRouter.get("/:spaceId", authenticate, spaceGet);
spaceRouter.get("/:spaceId/delete", authenticate, spaceDelete);
export default spaceRouter;

import { Router } from "express";
import { spaceCreate } from "../../controllers/spaceController";
import { authenticate } from "../../middleware/auth/authenticator";
import spaceGet from "../../controllers/spaceController/spaceGet";

const spaceRouter = Router();

spaceRouter.post("/create", authenticate, spaceCreate);
spaceRouter.get("/:spaceId", authenticate, spaceGet);
export default spaceRouter;

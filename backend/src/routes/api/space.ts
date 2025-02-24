import { Router } from "express";
import { spaceCreate } from "../../controllers/spaceController";
import { authenticate } from "../../middleware/auth/authenticator";

const spaceRouter = Router();

spaceRouter.post("/create", authenticate, spaceCreate);

export default spaceRouter;

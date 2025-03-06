// User profile, settings, bio, etc. routes
import { Router } from "express";
import { authenticate } from "../../middleware/auth/authenticator";
import { userGet, userGetSpaces } from "../../controllers/userController";

const userRouter = Router();

userRouter.get("/spaces", authenticate, userGetSpaces);
userRouter.get("/me", authenticate, userGet);

export default userRouter;

// User profile, settings, bio, etc. routes
import { Router } from "express";
import { authenticate } from "../../middleware/auth/authenticator";
import userGetSpaces from "../../controllers/userController/userGetSpaces";

const userRouter = Router();

userRouter.get("/:userId", authenticate, userGetSpaces);

export default userRouter;

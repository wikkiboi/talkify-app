// User profile, settings, bio, etc. routes
import { Router } from "express";
import { authenticate } from "../../middleware/auth/authenticator";
import {
  userGet,
  userGetLastVisited,
  userGetSpaces,
  userGetStatus,
  userUpdateLastVisited,
} from "../../controllers/userController";

const userRouter = Router();

userRouter.get("/spaces", authenticate, userGetSpaces);
userRouter.get("/status", authenticate, userGetStatus);
userRouter.get("/me", authenticate, userGet);
userRouter.get("/:spaceId/lastVisited", authenticate, userGetLastVisited);
userRouter.put("/:spaceId/lastVisited", authenticate, userUpdateLastVisited);

export default userRouter;

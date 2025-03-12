// User profile, settings, bio, etc. routes
import { Router } from "express";
import { authenticate } from "../../middleware/auth/authenticator";
import {
  friendAdd,
  friendDelete,
  friendDeny,
  friendGet,
  friendGetAll,
  friendRequest,
} from "../../controllers/friendController";

const friendRouter = Router();

friendRouter.get("/me", authenticate, friendGetAll);
friendRouter.get("/:friendId", authenticate, friendGet);
friendRouter.post("/:friendId/request", authenticate, friendRequest);
friendRouter.put("/:friendId/add", authenticate, friendAdd);
friendRouter.delete("/:friendId/remove", authenticate, friendDelete);
friendRouter.delete("/:friendId/deny", authenticate, friendDeny);

export default friendRouter;

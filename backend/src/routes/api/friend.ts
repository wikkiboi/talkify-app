import { Router } from "express";
import { authenticate } from "../../middleware/auth/authenticator";
import {
  friendAdd,
  friendDelete,
  friendDeny,
  friendGet,
  friendGetAll,
  friendRequest,
} from "../../controllers/friend.controller";

const friendRouter = Router();

// GET
friendRouter.get("/me", authenticate, friendGetAll);
friendRouter.get("/:friendId", authenticate, friendGet);

// POST
friendRouter.post("/:friendId/request", authenticate, friendRequest);

// PUT
friendRouter.put("/:friendId/add", authenticate, friendAdd);

// DELETE
friendRouter.delete("/:friendId/remove", authenticate, friendDelete);
friendRouter.delete("/:friendId/deny", authenticate, friendDeny);

export default friendRouter;

import { Router } from "express";
import { authenticate } from "../../middleware/auth/authenticator";
import {
  dmCreate,
  dmGet,
  dmGetAll,
  dmGetMsgs,
  dmGroupAdd,
  dmGroupCreate,
  dmGroupDelete,
  dmGroupGet,
  dmGroupGetMsgs,
  dmGroupLeave,
} from "../../controllers/dmController";

const dmRouter = Router();

// GET
dmRouter.get("/me", authenticate, dmGetAll);
dmRouter.get("/:dmId/private", authenticate, dmGet);
dmRouter.get("/:dmId/msgs", authenticate, dmGetMsgs);
dmRouter.get("/:groupId/group", authenticate, dmGroupGet);
dmRouter.get("/:groupId/group/msgs", authenticate, dmGroupGetMsgs);

// POST
dmRouter.post("/group/create", authenticate, dmGroupCreate);
dmRouter.post("/:userId/create", authenticate, dmCreate);

// PUT
dmRouter.put("/:groupId/add", authenticate, dmGroupAdd);

// DELETE
dmRouter.delete("/:groupId/leave", authenticate, dmGroupLeave);
dmRouter.delete("/:groupId/delete", authenticate, dmGroupDelete);

export default dmRouter;

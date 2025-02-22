import { Router } from "express";
import { spaceCreate } from "../../controllers/spaceController";

const spaceRouter = Router();

spaceRouter.post("/create", spaceCreate);

export default spaceRouter;

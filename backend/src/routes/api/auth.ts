import { Router } from "express";
import { userGet, login, register } from "../../controllers/authController";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

export default authRouter;

import { Router } from "express";
import UserController from "../controllers/userController.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/user/register", userController.create);
userRouter.post("/user/login", userController.login);

export default userRouter;

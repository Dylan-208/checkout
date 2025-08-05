import { Router } from "express";
import UserController from "../controllers/userController.js";
import authMiddleware from "../factories/authMiddlewareFactory.js";

const router = Router();
const userController = new UserController();

router.post("/user/register", userController.create);
router.post("/user/login", userController.login);

export default router;

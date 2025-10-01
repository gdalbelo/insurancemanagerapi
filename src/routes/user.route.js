import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";

import { Router } from "express";

const userRouter = Router();

userRouter.post("/create", userController.createUserController);

userRouter.use(authMiddleware);
userRouter.get("/", userController.findAllUserController);

userRouter.use(validId);
userRouter.get("/findById/:id?", validId, validUser, userController.findUserByIdController);
userRouter.patch("/update/:id", validId, validUser, userController.updateUserController);

export default userRouter;

import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validId, validUser } from "../middlewares/global.middleware.js";

import { Router } from "express";

const userRouter = Router();

userRouter.get("/userData/:id", userController.findUserData);

userRouter.post("/create", userController.createUserController);

//userRouter.use(authMiddleware);
userRouter.get("/", userController.findAllUserController);


//userRouter.use(validId);
userRouter.get("/findById/:id?", userController.findUserByIdController);
userRouter.get("/userid/:id", userController.findUserData);
userRouter.put("/:id", userController.updateUserController);

export default userRouter;

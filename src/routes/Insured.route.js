import insuredController from "../controllers/Insured.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middleware.js";

import { Router } from "express";

const insuredRouter = Router();

insuredRouter.get("/", insuredController.findAllInsuredsController);
insuredRouter.get("/top", insuredController.topNewsController);
insuredRouter.get("/search", insuredController.searchInsuredController);

insuredRouter.get("/:ByUserId", insuredController.findInsuredsByUserIdController);

//insuredRouter.use(authMiddleware);
insuredRouter.post("/create", insuredController.createInsuredController);

//insuredRouter.use(validId);
insuredRouter.get("/byIdInsurance/:id?", insuredController.findInsuredByIdController);
insuredRouter.get("/byUserId/:id", insuredController.findInsuredsByUserIdController);
insuredRouter.put("/update/:id", insuredController.updateInsuredController);
insuredRouter.delete("/delete/:id", insuredController.deleteInsuredController);
insuredRouter.patch("/:id/like", insuredController.likeInsuredController);
insuredRouter.patch("/:id/comment", insuredController.commentInsuredController);
insuredRouter.patch(
  "/:id/:idComment/comment",
  insuredController.commentDeleteInsuredController
);

export default insuredRouter;

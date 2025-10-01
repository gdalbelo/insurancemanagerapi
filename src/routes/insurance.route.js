import insuranceController from "../controllers/insurance.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middlewares.js";

import { Router } from "express";

const postRouter = Router();

postRouter.get("/", insuranceController.findAllInsurancesController);
postRouter.get("/top", insuranceController.topNewsController);
postRouter.get("/search", insuranceController.searchInsuranceController);

//postRouter.use(authMiddleware);
postRouter.post("/create", insuranceController.createInsuranceController);

//postRouter.use(validId);
postRouter.get("/byIdInsurance/:id", insuranceController.findInsuranceByIdController);
postRouter.get("/byUserId/:id", insuranceController.findInsurancesByUserIdController);
postRouter.patch("/update/:id", insuranceController.updateInsuranceController);
postRouter.delete("/delete/:id", insuranceController.deleteInsuranceController);
postRouter.patch("/:id/like", insuranceController.likeInsuranceController);
postRouter.patch("/:id/comment", insuranceController.commentInsuranceController);
postRouter.patch(
  "/:id/:idComment/comment",
  insuranceController.commentDeleteInsuranceController
);

export default postRouter;

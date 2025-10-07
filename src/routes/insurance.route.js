import insuranceController from "../controllers/insurance.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middleware.js";

import { Router } from "express";

const insuranceRouter = Router();

insuranceRouter.get("/", insuranceController.findAllInsurancesController);
insuranceRouter.get("/top", insuranceController.topNewsController);
insuranceRouter.get("/search", insuranceController.searchInsuranceController);

insuranceRouter.get("/:ByUserId", insuranceController.findInsurancesByUserIdController);

//insuranceRouter.use(authMiddleware);
insuranceRouter.post("/create", insuranceController.createInsuranceController);

//insuranceRouter.use(validId);
insuranceRouter.get("/byIdInsurance/:id?", insuranceController.findInsuranceByIdController);
insuranceRouter.get("/byUserId/:id", insuranceController.findInsurancesByUserIdController);
insuranceRouter.put("/update/:id", insuranceController.updateInsuranceController);
insuranceRouter.delete("/delete/:id", insuranceController.deleteInsuranceController);
insuranceRouter.patch("/:id/like", insuranceController.likeInsuranceController);
insuranceRouter.patch("/:id/comment", insuranceController.commentInsuranceController);
insuranceRouter.patch(
  "/:id/:idComment/comment",
  insuranceController.commentDeleteInsuranceController
);

export default insuranceRouter;

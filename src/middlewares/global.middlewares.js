import mongoose from "mongoose";
import userService from "../services/user.service.js";

export function validId(req, res, next) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid ID" });
  }

  next();
};

export async function validUser(req, res, next) {
  const id = req.params.id;
  const user = await userService.findUserByIdService(id);

  if(!user) {
    return res.status(400).send({ message: "User not found" });
  }

  req.id = id;
  req.user = user;

  next();
}


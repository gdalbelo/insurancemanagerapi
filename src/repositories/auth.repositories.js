//import User from "../models/User.js";
import UserSchema from "../schemas/User.js";

// const loginRepository = (email) =>
//   User.findOne({ email: email }).select("+password");

const create = async (data) => {
  return await UserSchema.create(data);
}

const findByEmail = async (email) => {
  const user = await UserSchema.findOne({ email });
  return user;
}

export default { create, findByEmail };

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import userRepositories from "../repositories/user.repositories.js";
import authRepositories from "../repositories/auth.repositories.js";

function generateToken(id) {
  return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: 86400 });
}

const loginService = async ({ email, password }) => {
  const user = await userRepositories.findByEmailUserRepository(email);

  if (!user) throw new Error("Wrong password or username");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Invalid password");

  const token = generateToken(user.id);

  return {token, userData: user};
};

const signup = async (body) => {
  const hasPassword = bcrypt.hashSync(body.password, 10);

  const userExists = await authRepositories.findByEmail(body.email);
  if (userExists) throw new Error("User already exists!");

  return await authRepositories.create({ ...body, password: hasPassword });
}

export default { loginService, generateToken, signup };

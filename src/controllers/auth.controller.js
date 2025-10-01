import authService from "../services/auth.service.js";

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.loginService({ email, password });
    return res.send(token);
  } catch (e) {
    return res.status(401).send(e.message);
  }
};

const signup = async (req, res) => {
  const body = req.body;
  const resService = await authService.signup(body);
  console.log(resService);
  res.send(resService);
}

export default { loginController, signup };

import userService from "../services/user.service.js";

async function createUserController(req, res) {
  const { name, username, email, password, avatar, background } = req.body;

  try {
    const token = await userService.createUserService({
      name,
      username,
      email,
      password,
      avatar,
      background,
    });
    res.status(201).send(token);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function findAllUserController(req, res) {
  try {
    const users = await userService.findAllUserService();
    return res.send(users);
  } catch (e) {
    return res.status(404).send(e.message);
  }
}

async function findUserData(req, res) {
  try {
    let { id } = req.params;
    const user = await userService.findUserPersonalDataService(id);
    return res.send(user);
  } catch (e) {
    return res.status(404).send(e.message);
  }
}

async function findUserByIdController(req, res) {
  try {
    const user = await userService.findUserByIdService(
      req.params.id,
      req.userId
    );
    return res.send(user);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function updateUserController(req, res) {
  try {
    const { name, username, email, perfil } = req.body;
    const { id } = req.params;

    console.log(`Nome: ${name} Username: ${username} Email: ${email} id: ${id} Perfil: ${perfil}`);

    const response = await userService.updateUserService(name, username, email, perfil, id);

    return res.send(response);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

export default {
  createUserController,
  findAllUserController,
  findUserByIdController,
  updateUserController,
  findUserData,
};
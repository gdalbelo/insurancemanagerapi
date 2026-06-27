import InsuredService from "../services/Insured.service.js";

async function createInsuredController(req, res) {
  console.log(req.body);
  const { fullname, cpfcnpj, dtnascimento, estadocivil, genero, profissao, contato, logradouro, numero, complemento, bairro, cep, segurado, userid } = req.body;
     console.log('createInsuredController: ', fullname, cpfcnpj, dtnascimento, estadocivil, genero, profissao, contato, logradouro, numero, complemento, bairro, cep, segurado, userid);
    //return;

  try {
    const Insured = await InsuredService.createInsuredService(
      {fullname, cpfcnpj, dtnascimento, estadocivil, genero, profissao, contato, logradouro, numero, complemento, bairro, cep, segurado, userid}
    );
    return res.status(201).send(Insured);
  } catch (e) { 
    res.status(500).send(e.message);
  }
}

async function findAllInsuredsController(req, res) {
  const { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const Insureds = await InsuredService.findAllinsuredsService();
    return res.send(Insureds);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function topNewsController(req, res) {
  try {
    const Insured = await InsuredService.topNewsService();
    return res.send(Insured);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function searchInsuredController(req, res) {
  const { title } = req.query;

  try {
    const foundInsureds = await InsuredService.searchInsuredService(title);

    return res.send(foundInsureds);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findInsuredById(req, res) {
  const { id } = req.query;

  try {
    const insured = await InsuredService.findInsuredById(id);
    return res.send(insured);
  } catch (e) {
    
  }
}

async function findInsuredByIdController(req, res) {
  const { id } = req.params;
  try {
    const Insured = await InsuredService.findInsuredByIdService(id);
    console.log(Insured);
    return res.send(Insured);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

async function findInsuredsByUserIdController(req, res) {
  const id = req.params.id;
  try {
    //onst Insureds = await InsuredService.findInsuredsByUserIdService(id);
    return res.send(id);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function updateInsuredController(req, res) {
  const { numapolice, coberturas, premio, id, segurado, userId } = req.body;
  try {
    await InsuredService.updateInsuredService(id, numapolice, coberturas, premio, segurado, userId);

    return res.send({ message: "Seguro atualizado com sucesso!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function deleteInsuredController(req, res) {
  const { id } = req.params;
  try {
    await InsuredService.deleteInsuredService(id);
    return res.send({ message: "Insured deleted successfully" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function likeInsuredController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const response = await InsuredService.likeInsuredService(id, userId);

    return res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentInsuredController(req, res) {
  const { id: InsuredId } = req.params;
  const { message } = req.body;
  const userId = req.userId;

  try {
    await InsuredService.commentInsuredService(InsuredId, message, userId);

    return res.send({
      message: "Comment successfully completed!",
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentDeleteInsuredController(req, res) {
  const { id: InsuredId, idComment } = req.params;
  const userId = req.userId;

  try {
    await InsuredService.commentDeleteInsuredService(InsuredId, userId, idComment);

    return res.send({ message: "Comment successfully removed" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export default {
  createInsuredController,
  findAllInsuredsController,
  topNewsController,
  searchInsuredController,
  findInsuredById,
  findInsuredByIdController,
  findInsuredsByUserIdController,
  updateInsuredController,
  deleteInsuredController,
  likeInsuredController,
  commentInsuredController,
  commentDeleteInsuredController,
};

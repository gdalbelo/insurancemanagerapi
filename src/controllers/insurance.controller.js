import InsuranceService from "../services/insurance.service.js";

async function createInsuranceController(req, res) {
  const { numapolice, coberturas, premio } = req.body;
  const userId = req.userId;

  try {
    const Insurance = await InsuranceService.createInsuranceService(
      { numapolice, coberturas, premio },
      userId
    );
    return res.status(201).send(Insurance);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findAllInsurancesController(req, res) {
  const { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const insurances = await InsuranceService.findAllInsurancesService();
    return res.send(insurances);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function topNewsController(req, res) {
  try {
    const insurance = await InsuranceService.topNewsService();
    return res.send(insurance);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function searchInsuranceController(req, res) {
  const { title } = req.query;

  try {
    const foundInsurances = await InsuranceService.searchInsuranceService(title);

    return res.send(foundInsurances);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findInsuranceByIdController(req, res) {
  const { id } = req.params;

  try {
    const insurance = await InsuranceService.findInsuranceByIdService(id);
    return res.send(insurance);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

async function findInsurancesByUserIdController(req, res) {
  const id = req.userId;
  try {
    const insurances = await InsuranceService.findInsurancesByUserIdService(id);
    return res.send(insurances);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function updateInsuranceController(req, res) {
  const { numapolice, coberturas, premio } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  try {
    await InsuranceService.updateInsuranceService(id, numapolice, coberturas, premio, userId);

    return res.send({ message: "Insurance successfully updated!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function deleteInsuranceController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await InsuranceService.deleteInsuranceService(id, userId);
    return res.send({ message: "Insurance deleted successfully" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function likeInsuranceController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const response = await InsuranceService.likeInsuranceService(id, userId);

    return res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentInsuranceController(req, res) {
  const { id: InsuranceId } = req.params;
  const { message } = req.body;
  const userId = req.userId;

  try {
    await InsuranceService.commentInsuranceService(InsuranceId, message, userId);

    return res.send({
      message: "Comment successfully completed!",
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentDeleteInsuranceController(req, res) {
  const { id: InsuranceId, idComment } = req.params;
  const userId = req.userId;

  try {
    await InsuranceService.commentDeleteInsuranceService(InsuranceId, userId, idComment);

    return res.send({ message: "Comment successfully removed" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export default {
  createInsuranceController,
  findAllInsurancesController,
  topNewsController,
  searchInsuranceController,
  findInsuranceByIdController,
  findInsurancesByUserIdController,
  updateInsuranceController,
  deleteInsuranceController,
  likeInsuranceController,
  commentInsuranceController,
  commentDeleteInsuranceController,
};

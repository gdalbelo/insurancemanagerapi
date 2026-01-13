import insuranceRepositories from "../repositories/insurance.repositories.js";
import User from "../schemas/User.js";

async function createInsuranceService({ user, numapolice, coberturas, premio }) {
  console.log('Dados: ' + user, numapolice, coberturas, premio);
  if (!user || !numapolice || !coberturas || !premio)
    throw new Error("Envie todos os campos para registrar.");

  const { id } = await insuranceRepositories.createInsuranceRepository(
    user,
    numapolice,
    coberturas,
    premio
  );

  return {
    message: "Seguro criado com sucesso!",
    user: { id, user, numapolice, coberturas, premio },
  };
}

async function findAllInsurancesService(limit, offset, currentUrl) {
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const insurances = await insuranceRepositories.findAllInsurancesRepository(offset, limit);

  const total = await insuranceRepositories.countInsurances();

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  //insurances.shift();

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: insurances.map((insurance) => ({
      id: insurance._id,
      user: insurance.user,
      numapolice: insurance.numapolice,
      coberturas: insurance.coberturas,
      premio: insurance.premio,
      createdAt: insurance.createdAt
    })),
  };
}

async function topNewsService() {
  const post = await insuranceRepositories.topNewsRepository();

  if (!post) throw new Error("There is no registered post");

  return {
    post: {
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    },
  };
}

async function searchPostService(title) {
  const foundPosts = await insuranceRepositories.searchPostRepository(title);

  if (foundPosts.length === 0)
    throw new Error("There are no posts with this title");

  return {
    foundPosts: foundPosts.map((post) => ({
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    })),
  };
}

async function findInsuranceByIdService(id) {
  const insurance = await insuranceRepositories.findInsuranceByIdRepository(id);

  if (!insurance) throw new Error("Insurances not found");
  console.log('Seguros: ' + insurance);
  return {
    insurance
  };
}

async function findInsurancesByUserIdService(id) {
  const insurances = await insuranceRepositories.findInsurancesByUserIdRepository(id);

  return {
      insurancesByUser: insurances.map((seguro) => ({
        id: seguro._id,
        user: seguro.user,
        numapolice: seguro.numapolice,
        coberturas: seguro.coberturas,
        premio: seguro.premio,
        createdAt: seguro.createdAt
      })),
  };
}

async function updateInsuranceService(id, numapolice, coberturas, premio, userId) {

  if (!numapolice || !coberturas || !premio)
    throw new Error("Envie pelo menos um campo para atualizar o seguro");

  const insurance = await insuranceRepositories.findInsuranceByIdRepository(id);

  if (!insurance) throw new Error("Seguro não encontrado");

  if (insurance.user != userId) throw new Error("Esse usuário não criou esse seguro.");

  await insuranceRepositories.updateInsuranceRepository(id, numapolice, coberturas, premio, userId);
}

async function deleteInsuranceService(id) {
  const insurance = await insuranceRepositories.findInsuranceByIdRepository(id);

  if (!insurance) throw new Error("Seguro não encontrado.");

  //if (insurance.user._id != userId) throw new Error("Não foi você quem criou esse seguro.");

  await insuranceRepositories.deleteInsuranceRepository(id);
}

async function likePostService(id, userId) {
  const postLiked = await postService.likesService(id, userId);

  if (postLiked.lastErrorObject.n === 0) {
    await postService.likesDeleteService(id, userId);
    return { message: "Like successfully removed" };
  }

  return { message: "Like done successfully" };
}

async function commentPostService(postId, message, userId) {
  if (!message) throw new Error("Write a message to comment");

  const post = await insuranceRepositories.findInsuranceByIdRepository(postId);

  if (!post) throw new Error("Post not found");

  await insuranceRepositories.commentsRepository(postId, message, userId);
}

async function commentDeletePostService(postId, userId, idComment) {
  const post = await insuranceRepositories.findInsuranceByIdRepository(postId);

  if (!post) throw new Error("Post not found");

  await insuranceRepositories.commentsDeleteRepository(postId, userId, idComment);
}

export default {
  createInsuranceService,
  findAllInsurancesService,
  topNewsService,
  searchPostService,
  findInsuranceByIdService,
  findInsurancesByUserIdService,
  updateInsuranceService,
  deleteInsuranceService,
  likePostService,
  commentPostService,
  commentDeletePostService,
};

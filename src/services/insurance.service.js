import insuranceRepositories from "../repositories/insurance.repositories.js";

async function createInsuranceService({ numapolice, coberturas, premio }, userId) {
  console.log(numapolice, coberturas, premio);
  if (!numapolice || !coberturas || !premio)
    throw new Error("Envie todos os campos para registrar.");

  const { id } = await insuranceRepositories.createInsuranceRepository(
    numapolice,
    coberturas,
    premio,
    userId
  );

  return {
    message: "Seguro criado com sucesso!",
    post: { id, numapolice, coberturas, premio },
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

  if (!insurance) throw new Error("Post not found");

  return {
    id: insurance._id,
    numapolice: insurance.numapolice,
    coberturas: insurance.coberturas,
    premio: insurance.premio
  };
}

async function findInsurancesByUserIdService(id) {
  const insurance = await insuranceRepositories.findInsurancesByUserIdRepository(id);

  return {
    postsByUser: posts.map((post) => ({
      id: post._id,
      user: insurance.user,
      numapolice: insurance.numapolice,
      coberturas: insurance.coberturas,
      premio: insurance.premio,
      createdAt: insurance.createdAt
    })),
  };
}

async function updatePostService(id, title, banner, text, userId) {
  if (!title && !banner && !text)
    throw new Error("Submit at least one field to update the post");

  const post = await insuranceRepositories.findInsuranceByIdRepository(id);

  if (!post) throw new Error("Post not found");

  if (post.user._id != userId) throw new Error("You didn't create this post");

  await insuranceRepositories.updatePostRepository(id, title, banner, text);
}

async function deleteInsuranceService(id, userId) {
  const insurance = await insuranceRepositories.findInsuranceByIdRepository(id);

  if (!insurance) throw new Error("Seguro não encontrado.");

  if (insurance.user._id != userId) throw new Error("Não foi você quem criou esse seguro.");

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
  updatePostService,
  deleteInsuranceService,
  likePostService,
  commentPostService,
  commentDeletePostService,
};

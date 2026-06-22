import insuredRepositories from "../repositories/insured.repositories.js";
import User from "../schemas/User.js";

async function createInsuredService({ user, fullname, cpfcnpj, dtnascimento, estadocivil, genero, profissao, contato, logradouro, numero, complemento, bairro, cep }) {
  console.log('Dados: ' + fullname, cpfcnpj, dtnascimento, estadocivil, genero, profissao, contato, logradouro, numero, complemento, bairro, cep);
  if (!user || !numapolice || !coberturas || !premio)
    throw new Error("Envie todos os campos para registrar.");

  const { id } = await insuredRepositories.createInsuredRepository(
    user,
    fullname,
    cpfcnpj,
    dtnascimento,
    estadocivil,
    genero,
    profissao,  
    contato,
    logradouro,
    numero,
    complemento,
    bairro,
    cep
  );

  return {
    message: "Segurado criado com sucesso!",
    user: { id, user, numapolice, coberturas, premio },
  };
}

async function findAllinsuredsService(limit, offset, currentUrl) {
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const insureds = await insuredRepositories.findAllinsuredsRepository(offset, limit);

  const total = await insuredRepositories.countinsureds();

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  //insureds.shift();

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: insureds.map((insured) => ({
      id: insured._id,
      user: insured.user,
      numapolice: insured.numapolice,
      coberturas: insured.coberturas,
      premio: insured.premio,
      createdAt: insured.createdAt
    })),
  };
}

async function topNewsService() {
  const post = await insuredRepositories.topNewsRepository();

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
  const foundPosts = await insuredRepositories.searchPostRepository(title);

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

async function findinsuredByIdService(id) {
  const insured = await insuredRepositories.findinsuredByIdRepository(id);

  if (!insured) throw new Error("insureds not found");
  console.log('Seguros: ' + insured);
  return {
    insured
  };
}

async function findinsuredsByUserIdService(id) {
  const insureds = await insuredRepositories.findinsuredsByUserIdRepository(id);

  return {
      insuredsByUser: insureds.map((seguro) => ({
        id: seguro._id,
        user: seguro.user,
        numapolice: seguro.numapolice,
        coberturas: seguro.coberturas,
        premio: seguro.premio,
        createdAt: seguro.createdAt
      })),
  };
}

async function updateinsuredService(id, numapolice, coberturas, premio, userId) {

  if (!numapolice || !coberturas || !premio)
    throw new Error("Envie pelo menos um campo para atualizar o seguro");

  const insured = await insuredRepositories.findinsuredByIdRepository(id);

  if (!insured) throw new Error("Seguro não encontrado");

  if (insured.user != userId) throw new Error("Esse usuário não criou esse seguro.");

  await insuredRepositories.updateinsuredRepository(id, numapolice, coberturas, premio, userId);
}

async function deleteinsuredService(id) {
  const insured = await insuredRepositories.findinsuredByIdRepository(id);

  if (!insured) throw new Error("Seguro não encontrado.");

  //if (insured.user._id != userId) throw new Error("Não foi você quem criou esse seguro.");

  await insuredRepositories.deleteinsuredRepository(id);
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

  const post = await insuredRepositories.findinsuredByIdRepository(postId);

  if (!post) throw new Error("Post not found");

  await insuredRepositories.commentsRepository(postId, message, userId);
}

async function commentDeletePostService(postId, userId, idComment) {
  const post = await insuredRepositories.findinsuredByIdRepository(postId);

  if (!post) throw new Error("Post not found");

  await insuredRepositories.commentsDeleteRepository(postId, userId, idComment);
}

export default {
  createInsuredService,
  findAllinsuredsService,
  topNewsService,
  searchPostService,
  findinsuredByIdService,
  findinsuredsByUserIdService,
  updateinsuredService,
  deleteinsuredService,
  likePostService,
  commentPostService,
  commentDeletePostService,
};

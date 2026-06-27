import insuredRepositories from "../repositories/insured.repositories.js";
import User from "../schemas/User.js";

async function createInsuredService({fullname, cpfcnpj, dtnascimento, estadocivil, genero, profissao, contato, logradouro, numero, complemento, bairro, cep, segurado, userid}) {
  console.log('Dados: ' +  fullname, cpfcnpj, dtnascimento, estadocivil, genero, profissao, contato, logradouro, numero, complemento, bairro, cep, segurado, userid);
  //return;
  // if (!userid || !fullname || !cpfcnpj || !dtnascimento || !estadocivil || !genero || !profissao || !contato || !logradouro || !numero || !complemento || !bairro || !cep)
  //   throw new Error("Envie todos os campos para registrar.");

  const { id } = await insuredRepositories.createInsuredRepository(
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
    cep,
    segurado,
    userid
  );

  console.log('Id criado: ', id);

  return {
    message: "Segurado criado com sucesso!",
    user: { id, userid },
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

  const insureds = await insuredRepositories.findAllInsuredsRepository(offset, limit);

  const total = await insuredRepositories.countInsureds();

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
      createdAt: insured.createdAt,
      fullname: insured.fullname,
      cpfcnpj: insured.cpfcnpj,
      dtnascimento: insured.dtnascimento,
      estadocivil: insured.estadocivil,
      genero: insured.genero,
      profissao: insured.profissao,
      contato: insured.contato,
      logradouro: insured.logradouro,
      numero: insured.numero,
      complemento: insured.complemento,
      bairro: insured.bairro,
      cep: insured.cep,
      userid: insured.userid,
      createdAt: insured.createdAt})),
  };
}

async function getInsuredNameById(id) {
  const insured = insuredRepositories.findInsuredNameById(id);
  return insured;
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
  const insured = await insuredRepositories.findInsuredByIdRepository(id);

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
        userid: seguro.userid,
        fullname: seguro.fullname,
        dtnascimento: seguro.dtnascimento,
        cpfcnpj: seguro.cpfcnpj,
        estadocivil: seguro.estadocivil,
        genero: seguro.genero,
        profissao: seguro.profissao,
        contato: seguro.contato,
        logradouro: seguro.logradouro,
        numero: seguro.numero,
        complemento: seguro.complemento,
        bairro: seguro.bairro,
        cep: seguro.cep,
        userid: seguro.userid
      }))
  }
}

async function updateinsuredService(id, numapolice, coberturas, premio, segurado, userId) {

  if (!numapolice || !coberturas || !premio || !segurado)
    throw new Error("Envie pelo menos um campo para atualizar o seguro");

  const insured = await insuredRepositories.findInsuredByIdRepository(id);

  if (!insured) throw new Error("Seguro não encontrado");

  if (insured.user != userId) throw new Error("Esse usuário não criou esse seguro.");

  await insuredRepositories.updateinsuredRepository(id, numapolice, coberturas, premio, segurado, userId);
}

async function deleteInsuredService(id) {
  const insured = await insuredRepositories.findInsuredByIdRepository(id);

  if (!insured) throw new Error("Seguro não encontrado.");

  //if (insured.user._id != userId) throw new Error("Não foi você quem criou esse seguro.");

  await insuredRepositories.deleteInsuredRepository(id);
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

  const post = await insuredRepositories.findInsuredByIdRepository(postId);

  if (!post) throw new Error("Post not found");

  await insuredRepositories.commentsRepository(postId, message, userId);
}

async function commentDeletePostService(postId, userId, idComment) {
  const post = await insuredRepositories.findInsuredByIdRepository(postId);

  if (!post) throw new Error("Post not found");

  await insuredRepositories.commentsDeleteRepository(postId, userId, idComment);
}

export default {
  createInsuredService,
  findAllinsuredsService,
  topNewsService,
  searchPostService,
  getInsuredNameById,
  findinsuredByIdService,
  findinsuredsByUserIdService,
  updateinsuredService,
  deleteInsuredService,
  likePostService,
  commentPostService,
  commentDeletePostService,
};

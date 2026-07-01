import Insured from "../models/Insured.js";
import mongoose from "mongoose";
import { MongoClient, ObjectId } from "mongodb";

function createInsuredRepository(fullname, cpfcnpj, dtnascimento, estadocivil, genero, profissao, contato, logradouro, numero, complemento, bairro, cep, userid) {
  console.log('createInsuredRepository: ', fullname, cpfcnpj, dtnascimento, estadocivil, genero, profissao, contato, logradouro, numero, complemento, bairro, cep, userid);
  return Insured.create({fullname, cpfcnpj, dtnascimento, estadocivil, genero, profissao, contato, logradouro, numero, complemento, bairro, cep, userid});
}

function findInsuredNameById(id) {
  let idUser = new ObjectId(id);
 
  return Insured.find({
    _id: idUser
  });
}

function findAllInsuredsRepository(offset, limit) {
  return Insured.find()
    .sort({ _id: -1 })
    .skip(offset)
}

function topNewsRepository() {
  return Insured.findOne().sort({ _id: -1 }).populate("user");
}

function findInsuredByIdRepository(id) {
  let idUser = new ObjectId(id);
  console.log('idUser: ' + idUser);
  return Insured.find({"user": idUser});
}

function countInsureds() {
  return Insured.countDocuments();
}

function searchInsuredRepository(title) {
  return Insured.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");
}

function findInsuredsByUserIdRepository(id) {
  const objectId = new ObjectId(id);
  return Insured.find({
    user: objectId
  }).populate("user");;
}


function updateInsuredRepository(id, numapolice, coberturas, premio, segurado, userId) {
  return Insured.findOneAndUpdate(
    {
      _id: id,
    },  
    {
      userId, numapolice, coberturas, premio, segurado
    },
    {
      rawResult: true,
    }
  );
}

function deleteInsuredRepository(id) {
  return Insured.findOneAndDelete({ _id: id });
}

function likesRepository(id, userId) {
  return Insured.findOneAndUpdate(
    {
      _id: id,
      "likes.userId": { $nin: [userId] },
    },
    {
      $push: {
        likes: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
}

function likesDeleteRepository(id, userId) {
  return Insured.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        likes: {
          userId: userId,
        },
      },
    }
  );
}

function commentsRepository(id, message, userId) {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);
  return Insured.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        comments: { idComment, userId, message, createdAt: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
}

function commentsDeleteRepository(id, userId, idComment) {
  return Insured.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        comments: {
          idComment: idComment,
          userId: userId,
        },
      },
    }
  );
}

export default {
  createInsuredRepository,
  findAllInsuredsRepository,
  topNewsRepository,
  findInsuredNameById,
  findInsuredByIdRepository,
  searchInsuredRepository,
  findInsuredsByUserIdRepository,
  updateInsuredRepository,
  deleteInsuredRepository,
  likesRepository,
  likesDeleteRepository,
  commentsRepository,
  commentsDeleteRepository,
  countInsureds,
};

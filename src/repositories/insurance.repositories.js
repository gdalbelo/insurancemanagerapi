import Insurance from "../models/Insurance.js";
import mongoose from "mongoose";
import { MongoClient, ObjectId } from "mongodb";

function createInsuranceRepository(user, numapolice, coberturas, premio) {
  return Insurance.create({ user, numapolice, coberturas, premio });
}

function findAllInsurancesRepository(offset, limit) {
  return Insurance.find()
    .sort({ _id: -1 })
    .skip(offset)
    .populate("user");
}

function topNewsRepository() {
  return Insurance.findOne().sort({ _id: -1 }).populate("user");
}

function findInsuranceByIdRepository(id) {
  let idUser = new ObjectId(id);
  console.log('idUser: ' + idUser);
  return Insurance.find({"user": idUser});
}

function countInsurances() {
  return Insurance.countDocuments();
}

function searchInsuranceRepository(title) {
  return Insurance.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");
}

function findInsurancesByUserIdRepository(id) {
  const objectId = new ObjectId(id);
  return Insurance.find({
    user: objectId
  }).populate("user");;
}


function updateInsuranceRepository(id, numapolice, coberturas, premio, userId) {
  return Insurance.findOneAndUpdate(
    {
      _id: id,
    },  
    {
      userId, numapolice, coberturas, premio
    },
    {
      rawResult: true,
    }
  );
}

function deleteInsuranceRepository(id) {
  return Insurance.findOneAndDelete({ _id: id }).populate("user");
}

function likesRepository(id, userId) {
  return Insurance.findOneAndUpdate(
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
  return Insurance.findOneAndUpdate(
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
  return Insurance.findOneAndUpdate(
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
  return Insurance.findOneAndUpdate(
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
  createInsuranceRepository,
  findAllInsurancesRepository,
  topNewsRepository,
  findInsuranceByIdRepository,
  searchInsuranceRepository,
  findInsurancesByUserIdRepository,
  updateInsuranceRepository,
  deleteInsuranceRepository,
  likesRepository,
  likesDeleteRepository,
  commentsRepository,
  commentsDeleteRepository,
  countInsurances,
};

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const InsuredSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  cpfcnpj: {
    type: String,
    required: true,
    unique: true,
  },
  dtnascimento: {
    type: Date,
    required: true,
    unique: true,
    lowercase: true,
  },
  estadocivil: {
    type: String,
    required: true,
    select: true,
  },
  genero: {
    type: String,
    required: true,
  },
  profissao: {
    type: String,
    required: true,
  },
  contato: {
    type: String,
    required: true,
  },
  logradouro: {
    type: String,
    required: true,
  },
  numero: {
    type: Number,
    required: true,
  },
  complemento: {
    type: String,
    required: true,
  },
  bairro: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

InsuredSchema.pre("save", async function (next) {
  next();
});

const Insured = mongoose.model("Insured", InsuredSchema);

export default Insured;

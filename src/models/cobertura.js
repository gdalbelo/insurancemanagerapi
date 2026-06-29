import mongoose from "mongoose";

const CoberturaSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true,
    unique: true
  },
  nome: {
    type: String,
    required: true,
    unique: true
  },
  descricao: {
    type: String
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Cobertura = mongoose.model("Cobertura", CoberturaSchema);

export default Cobertura;

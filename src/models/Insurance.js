import mongoose from "mongoose";

const InsuranceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  numapolice: {
    type: Number,
    required: true
  },
  coberturas: {
    type: String,
    required: true,
  },
  premio: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Insurance = mongoose.model("Insurance", InsuranceSchema);

export default Insurance;

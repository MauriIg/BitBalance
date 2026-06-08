import mongoose from "mongoose";

const lotePolloSchema = new mongoose.Schema(
  {
    cantidad: {
      type: Number,
      required: true,
    },

    costoCompra: {
      type: Number,
      required: true,
    },

    alimentoKg: {
      type: Number,
      default: 0,
    },

    observaciones: {
      type: String,
      default: "",
    },

    fechaCompra: {
      type: Date,
      default: Date.now,
    },

    estado: {
      type: String,
      default: "creciendo",
    },
  },
  {
    timestamps: true,
  }
);

const LotePollo = mongoose.model(
  "LotePollo",
  lotePolloSchema
);

export default LotePollo;
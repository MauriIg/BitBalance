import mongoose from "mongoose";

const lotePolloSchema = new mongoose.Schema(
  {
    cantidadInicial: {
      type: Number,
      required: true,
    },

    cantidadActual: {
      type: Number,
      required: true,
    },

    muertos: {
      type: Number,
      default: 0,
    },

    costoCompra: {
      type: Number,
      required: true,
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
      enum: [
        "creciendo",
        "listo_para_venta",
        "vendido",
      ],
      default: "creciendo",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "LotePollo",
  lotePolloSchema
);
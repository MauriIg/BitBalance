import mongoose from "mongoose";

const gastoAvicolaSchema = new mongoose.Schema(
  {
    concepto: {
      type: String,
      required: true,
    },

    monto: {
      type: Number,
      required: true,
    },

    categoria: {
      type: String,
      enum: [
        "alimento",
        "medicamento",
        "vacuna",
        "equipo",
        "otro",
      ],
      default: "otro",
    },

    observaciones: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "GastoAvicola",
  gastoAvicolaSchema
);

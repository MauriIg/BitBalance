import mongoose from "mongoose";

const gastoSchema = new mongoose.Schema(
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
        "transporte",
        "servicios",
        "nomina",
        "material",
        "equipo",
        "impuestos",
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
  "Gasto",
  gastoSchema
);

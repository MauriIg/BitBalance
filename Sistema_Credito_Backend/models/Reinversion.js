import mongoose from "mongoose";

const reinversionSchema = new mongoose.Schema(
  {
    monto: {
      type: Number,
      required: true,
    },

    descripcion: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Reinversion",
  reinversionSchema
);
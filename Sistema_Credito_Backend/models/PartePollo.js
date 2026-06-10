import mongoose from "mongoose";

const partePolloSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    precioKg: {
      type: Number,
      required: true,
    },

    descripcion: {
      type: String,
      default: "",
    },

    disponible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const PartePollo = mongoose.model(
  "PartePollo",
  partePolloSchema
);

export default PartePollo;

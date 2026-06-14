import mongoose from "mongoose";

const ventaPolloSchema =
  new mongoose.Schema(
    {
      parte: {
        type: String,
        required: true,
      },

      precioKg: {
        type: Number,
        required: true,
      },

      pesoKg: {
        type: Number,
        required: true,
      },

      total: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "VentaPollo",
  ventaPolloSchema
);
import mongoose from "mongoose";

const lotePolloSchema = new mongoose.Schema(
  {
    // 🐥 Pollitos comprados inicialmente
    cantidadInicial: {
      type: Number,
      required: true,
    },

    // 🐔 Pollos vivos actualmente
    cantidadActual: {
      type: Number,
      required: true,
    },

    // ☠️ Muertes acumuladas
    muertos: {
      type: Number,
      default: 0,
    },

    // 💰 Costo de compra de los pollitos
    costoCompra: {
      type: Number,
      required: true,
    },

    // 🌽 Alimento consumido
    alimentoKg: {
      type: Number,
      default: 0,
    },

    // ⚖️ Peso promedio actual por pollo
    pesoPromedio: {
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

const LotePollo = mongoose.model(
  "LotePollo",
  lotePolloSchema
);

export default LotePollo;

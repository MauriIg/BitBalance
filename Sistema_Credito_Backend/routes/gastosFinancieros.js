import express from "express";
import GastoFinanciero from "../models/Gasto.js";

const router = express.Router();

// Obtener gastos
router.get("/", async (req, res) => {
  try {
    const gastos = await GastoFinanciero.find().sort({
      createdAt: -1,
    });

    res.json(gastos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Crear gasto
router.post("/", async (req, res) => {
  try {
    const gasto = await GastoFinanciero.create(
      req.body
    );

    res.status(201).json(gasto);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Eliminar gasto
router.delete("/:id", async (req, res) => {
  try {
    await GastoFinanciero.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Gasto eliminado",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;

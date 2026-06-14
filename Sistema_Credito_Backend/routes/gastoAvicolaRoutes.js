import express from "express";
import GastoAvicola from "../models/GastoAvicola.js";

const router = express.Router();

// 🔥 OBTENER GASTOS
router.get("/", async (req, res) => {
  try {
    const gastos = await GastoAvicola.find().sort({
      createdAt: -1,
    });

    res.json(gastos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// 🔥 CREAR GASTO
router.post("/", async (req, res) => {
  try {
    const gasto = await GastoAvicola.create(
      req.body
    );

    res.status(201).json(gasto);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// 🔥 ELIMINAR GASTO
router.delete("/:id", async (req, res) => {
  try {
    await GastoAvicola.findByIdAndDelete(
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

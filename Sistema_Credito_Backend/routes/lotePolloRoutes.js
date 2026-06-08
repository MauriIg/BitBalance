import express from "express";
import LotePollo from "../models/LotePollo.js";

const router = express.Router();


// 🔥 OBTENER LOTES
router.get("/", async (req, res) => {
  try {
    const lotes = await LotePollo.find().sort({
      createdAt: -1,
    });

    res.json(lotes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// 🔥 CREAR LOTE
router.post("/", async (req, res) => {
  try {
    const nuevoLote =
      await LotePollo.create(req.body);

    res.status(201).json(nuevoLote);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
import express from "express";
import VentaPollo from "../models/VentaPollo.js";

const router = express.Router();


// 🔥 Obtener ventas
router.get("/", async (req, res) => {
  try {
    const ventas =
      await VentaPollo.find().sort({
        createdAt: -1,
      });

    res.json(ventas);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// 🔥 Crear venta
router.post("/", async (req, res) => {
  try {
    const venta =
      await VentaPollo.create(
        req.body
      );

    res.status(201).json(venta);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;

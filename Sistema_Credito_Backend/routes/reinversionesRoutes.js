import express from "express";
import Reinversion from "../models/Reinversion.js";

const router = express.Router();


// 🔥 OBTENER
router.get("/", async (req, res) => {
  try {
    const reinversiones =
      await Reinversion.find().sort({
        createdAt: -1,
      });

    res.json(reinversiones);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// 🔥 CREAR
router.post("/", async (req, res) => {
  try {
    const nuevaReinversion =
      await Reinversion.create({
        monto: req.body.monto,
        descripcion:
          req.body.descripcion || "",
      });

    res.status(201).json(
      nuevaReinversion
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
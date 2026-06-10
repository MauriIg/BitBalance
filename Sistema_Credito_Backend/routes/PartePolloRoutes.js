import express from "express";
import PartePollo from "../models/PartePollo.js";

const router = express.Router();


// 🔥 OBTENER
router.get("/", async (req, res) => {
  try {
    const partes = await PartePollo.find().sort({
      nombre: 1,
    });

    res.json(partes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// 🔥 CREAR
router.post("/", async (req, res) => {
  try {
    const nuevaParte =
      await PartePollo.create(req.body);

    res.status(201).json(nuevaParte);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// 🔥 EDITAR PRECIO
router.put("/:id", async (req, res) => {
  try {
    const parte = await PartePollo.findById(
      req.params.id
    );

    if (!parte) {
      return res
        .status(404)
        .json({ message: "No encontrada" });
    }

    parte.precioKg =
      req.body.precioKg ??
      parte.precioKg;

    parte.nombre =
      req.body.nombre ??
      parte.nombre;

    parte.descripcion =
      req.body.descripcion ??
      parte.descripcion;

    await parte.save();

    res.json(parte);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;

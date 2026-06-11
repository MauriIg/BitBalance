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

router.get("/test", (req, res) => {
  res.json({
    mensaje:
      "Ruta lotes-pollos funcionando"
  });
});


// ☠️ Registrar muerte
router.put("/:id/muerte", async (req, res) => {
  try {
    const lote = await LotePollo.findById(
      req.params.id
    );

    if (!lote) {
      return res
        .status(404)
        .json({
          message: "Lote no encontrado",
        });
    }

    if (lote.cantidadActual <= 0) {
      return res
        .status(400)
        .json({
          message:
            "No quedan pollos vivos",
        });
    }

    lote.cantidadActual -= 1;
    lote.muertos += 1;

    await lote.save();

    res.json(lote);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/test", (req, res) => {
  res.json({
    mensaje:
      "Ruta lotes-pollos funcionando"
  });
});


router.put("/:id", async (req, res) => {
  try {
    const lote =
      await LotePollo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(lote);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/prueba", (req, res) => {
  res.json({
    mensaje: "FUNCIONA"
  });
});



export default router;
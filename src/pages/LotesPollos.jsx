import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

const LotesPollos = () => {
  const [lotes, setLotes] = useState([]);

  const [formData, setFormData] = useState({
    cantidad: "",
    costoCompra: "",
    alimentoKg: "",
    observaciones: "",
  });

  // 🔥 OBTENER LOTES
  useEffect(() => {
    obtenerLotes();
  }, []);

  const obtenerLotes = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/lotes-pollos"
      );

      setLotes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 CREAR LOTE
  const crearLote = async () => {
    try {
      const res = await axiosInstance.post(
        "/api/lotes-pollos",
        formData
      );

      setLotes([res.data, ...lotes]);

      setFormData({
        cantidad: "",
        costoCompra: "",
        alimentoKg: "",
        observaciones: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🐔 Lotes de Pollos</h1>

      {/* FORM */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <input
          type="number"
          placeholder="Cantidad"
          value={formData.cantidad}
          onChange={(e) =>
            setFormData({
              ...formData,
              cantidad: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Costo compra"
          value={formData.costoCompra}
          onChange={(e) =>
            setFormData({
              ...formData,
              costoCompra: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Alimento KG"
          value={formData.alimentoKg}
          onChange={(e) =>
            setFormData({
              ...formData,
              alimentoKg: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Observaciones"
          value={formData.observaciones}
          onChange={(e) =>
            setFormData({
              ...formData,
              observaciones: e.target.value,
            })
          }
        />

        <button onClick={crearLote}>
          Guardar lote
        </button>
      </div>

      {/* TABLA */}
      <table
        style={{
          width: "100%",
          marginTop: "30px",
        }}
      >
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Costo</th>
            <th>Alimento</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {lotes.map((lote) => (
            <tr key={lote._id}>
              <td>{lote.cantidad}</td>
              <td>${lote.costoCompra}</td>
              <td>{lote.alimentoKg} KG</td>
              <td>{lote.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LotesPollos;
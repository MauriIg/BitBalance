import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

const LotesPollos = () => {
  const [lotes, setLotes] = useState([]);

  const [formData, setFormData] = useState({
    cantidadInicial: "",
    costoCompra: "",
    alimentoKg: "",
    pesoPromedio: "",
    observaciones: "",
  });

  // 🔥 OBTENER LOTES
  useEffect(() => {
    obtenerLotes();
  }, []);

  const obtenerLotes = async () => {
    try {
      const res = await axiosInstance.get("/api/lotes-pollos");

      setLotes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 CREAR LOTE
  const crearLote = async () => {
    try {
      const datos = {
        cantidadInicial: Number(
          formData.cantidadInicial
        ),

        cantidadActual: Number(
          formData.cantidadInicial
        ),

        muertos: 0,

        costoCompra: Number(
          formData.costoCompra
        ),

        alimentoKg: Number(
          formData.alimentoKg
        ),

        pesoPromedio: Number(
          formData.pesoPromedio || 0
        ),

        observaciones:
          formData.observaciones,
      };

      const res = await axiosInstance.post(
        "/api/lotes-pollos",
        datos
      );

      setLotes([res.data, ...lotes]);

      setFormData({
        cantidadInicial: "",
        costoCompra: "",
        alimentoKg: "",
        pesoPromedio: "",
        observaciones: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error al guardar lote");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🐔 Lotes de Pollos</h1>

      {/* FORMULARIO */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "500px",
          marginBottom: "30px",
        }}
      >
        <input
          type="number"
          placeholder="Cantidad inicial de pollos"
          value={formData.cantidadInicial}
          onChange={(e) =>
            setFormData({
              ...formData,
              cantidadInicial:
                e.target.value,
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
              costoCompra:
                e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Alimento (KG)"
          value={formData.alimentoKg}
          onChange={(e) =>
            setFormData({
              ...formData,
              alimentoKg:
                e.target.value,
            })
          }
        />

        <input
          type="number"
          step="0.1"
          placeholder="Peso promedio (KG)"
          value={formData.pesoPromedio}
          onChange={(e) =>
            setFormData({
              ...formData,
              pesoPromedio:
                e.target.value,
            })
          }
        />

        <textarea
          placeholder="Observaciones"
          value={formData.observaciones}
          onChange={(e) =>
            setFormData({
              ...formData,
              observaciones:
                e.target.value,
            })
          }
        />

        <button onClick={crearLote}>
          💾 Guardar lote
        </button>
      </div>

      {/* TABLA */}
      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
        }}
      >
        <thead>
          <tr>
            <th>🐥 Inicial</th>
            <th>🐔 Actual</th>
            <th>☠️ Muertos</th>
            <th>⚖️ Peso Promedio</th>
            <th>🌽 Alimento</th>
            <th>💰 Costo</th>
            <th>📅 Fecha</th>
            <th>📌 Estado</th>
          </tr>
        </thead>

        <tbody>
          {lotes.map((lote) => (
            <tr key={lote._id}>
              <td>
                {
                  lote.cantidadInicial
                }
              </td>

              <td>
                {
                  lote.cantidadActual
                }
              </td>

              <td>{lote.muertos}</td>

              <td>
                {
                  lote.pesoPromedio
                }{" "}
                KG
              </td>

              <td>
                {lote.alimentoKg} KG
              </td>

              <td>
                $
                {Number(
                  lote.costoCompra
                ).toFixed(2)}
              </td>

              <td>
                {new Date(
                  lote.fechaCompra
                ).toLocaleDateString()}
              </td>

              <td>
                {lote.estado}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LotesPollos;

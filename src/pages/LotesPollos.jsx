import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

const LotesPollos = () => {
  const [lotes, setLotes] = useState([]);

  const [formData, setFormData] = useState({
    cantidadInicial: "",
    costoCompra: "",
    observaciones: "",
  });

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
        observaciones: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error al guardar lote");
    }
  };

  const registrarMuerte = async (
    id
  ) => {
    const confirmar = window.confirm(
      "¿Registrar un pollo muerto?"
    );

    if (!confirmar) return;

    try {
      await axiosInstance.put(
        `/api/lotes-pollos/${id}/muerte`
      );

      obtenerLotes();
    } catch (error) {
      console.error(error);
      alert(
        "Error registrando mortalidad"
      );
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
          placeholder="Cantidad de pollitos"
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
          placeholder="Costo total compra"
          value={formData.costoCompra}
          onChange={(e) =>
            setFormData({
              ...formData,
              costoCompra:
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
            <th>🐔 Vivos</th>
            <th>☠️ Muertos</th>
            <th>💰 Compra</th>
            <th>📅 Fecha</th>
            <th>📌 Estado</th>
            <th>⚙️ Acciones</th>
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

              <td>
                {lote.muertos}
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

              <td>
                <button
                  onClick={() =>
                    registrarMuerte(
                      lote._id
                    )
                  }
                  style={{
                    background:
                      "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius:
                      "6px",
                    padding:
                      "6px 10px",
                    cursor:
                      "pointer",
                  }}
                >
                  ☠️ +1 Muerto
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LotesPollos;

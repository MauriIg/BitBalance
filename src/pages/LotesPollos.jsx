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

  const cambiarEstado = async (
    id,
    estado
  ) => {
  
    console.log("ID:", id);
    console.log("Estado:", estado);
  
    try {
      await axiosInstance.put(
        `/api/lotes-pollos/${id}`,
        {
          estado,
        }
      );
  
      obtenerLotes();
  
    } catch (error) {
      console.error(error);
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

  const thStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
  };
  
  const tdStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
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
    borderCollapse: "collapse",
    marginTop: "20px",
  }}
>
  <thead>
    <tr
      style={{
        background: "#343a40",
        color: "white",
      }}
    >
      <th style={thStyle}>
        🐥 Inicial
      </th>

      <th style={thStyle}>
        🐔 Vivos
      </th>

      <th style={thStyle}>
        ☠️ Muertos
      </th>

      <th style={thStyle}>
        💰 Compra
      </th>

      <th style={thStyle}>
        📅 Fecha
      </th>

      <th style={thStyle}>
        📌 Estado
      </th>

      <th style={thStyle}>
        ⚙️ Acciones
      </th>
    </tr>
  </thead>

  <tbody>
    {lotes.map((lote) => (
      <tr key={lote._id}>
        <td style={tdStyle}>
          {lote.cantidadInicial}
        </td>

        <td style={tdStyle}>
          {lote.cantidadActual}
        </td>

        <td style={tdStyle}>
          {lote.muertos}
        </td>

        <td style={tdStyle}>
          $
          {Number(
            lote.costoCompra
          ).toFixed(2)}
        </td>

        <td style={tdStyle}>
          {new Date(
            lote.fechaCompra
          ).toLocaleDateString()}
        </td>

        <td style={tdStyle}>
          <select
            value={lote.estado}
            onChange={(e) =>
              cambiarEstado(
                lote._id,
                e.target.value
              )
            }
          >
            <option value="creciendo">
              🐣 Creciendo
            </option>

            <option value="listo_para_venta">
              ⚖️ Listo venta
            </option>

            <option value="vendido">
              ✅ Vendido
            </option>
          </select>
        </td>

        <td style={tdStyle}>
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
                "8px 12px",
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

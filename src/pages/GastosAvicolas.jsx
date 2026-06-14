import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

const GastosAvicolas = () => {
  const [gastos, setGastos] = useState([]);

  const [formData, setFormData] =
    useState({
      concepto: "",
      monto: "",
      categoria: "alimento",
      observaciones: "",
    });

  useEffect(() => {
    obtenerGastos();
  }, []);

  const obtenerGastos = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/gastos-avicolas"
      );

      setGastos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const guardarGasto = async () => {
    try {
      const datos = {
        ...formData,
        monto: Number(formData.monto),
      };

      const res = await axiosInstance.post(
        "/api/gastos-avicolas",
        datos
      );

      setGastos([
        res.data,
        ...gastos,
      ]);

      setFormData({
        concepto: "",
        monto: "",
        categoria: "alimento",
        observaciones: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error guardando gasto");
    }
  };

  const eliminarGasto = async (
    id
  ) => {
    const confirmar =
      window.confirm(
        "¿Eliminar gasto?"
      );

    if (!confirmar) return;

    try {
      await axiosInstance.delete(
        `/api/gastos-avicolas/${id}`
      );

      obtenerGastos();
    } catch (error) {
      console.error(error);
    }
  };

  const totalGastos = gastos.reduce(
    (acc, gasto) =>
      acc + Number(gasto.monto || 0),
    0
  );

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
      <h1>💸 Gastos Avícolas</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "500px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Concepto"
          value={formData.concepto}
          onChange={(e) =>
            setFormData({
              ...formData,
              concepto:
                e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Monto"
          value={formData.monto}
          onChange={(e) =>
            setFormData({
              ...formData,
              monto:
                e.target.value,
            })
          }
        />

        <select
          value={formData.categoria}
          onChange={(e) =>
            setFormData({
              ...formData,
              categoria:
                e.target.value,
            })
          }
        >
          <option value="alimento">
            🌽 Alimento
          </option>

          <option value="medicamento">
            💊 Medicamento
          </option>

          <option value="vacuna">
            💉 Vacuna
          </option>

          <option value="equipo">
            🛠 Equipo
          </option>

          <option value="otro">
            📦 Otro
          </option>
        </select>

        <textarea
          placeholder="Observaciones"
          value={
            formData.observaciones
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              observaciones:
                e.target.value,
            })
          }
        />

        <button
          onClick={guardarGasto}
        >
          💾 Guardar gasto
        </button>
      </div>

      <h2>
        💰 Total Gastado: $
        {totalGastos.toFixed(2)}
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background:
                "#343a40",
              color: "white",
            }}
          >
            <th style={thStyle}>
              Concepto
            </th>

            <th style={thStyle}>
              Categoría
            </th>

            <th style={thStyle}>
              Monto
            </th>

            <th style={thStyle}>
              Fecha
            </th>

            <th style={thStyle}>
              Acción
            </th>
          </tr>
        </thead>

        <tbody>
          {gastos.map((gasto) => (
            <tr key={gasto._id}>
              <td style={tdStyle}>
                {gasto.concepto}
              </td>

              <td style={tdStyle}>
                {gasto.categoria}
              </td>

              <td style={tdStyle}>
                $
                {Number(
                  gasto.monto
                ).toFixed(2)}
              </td>

              <td style={tdStyle}>
                {new Date(
                  gasto.createdAt
                ).toLocaleDateString()}
              </td>

              <td style={tdStyle}>
                <button
                  onClick={() =>
                    eliminarGasto(
                      gasto._id
                    )
                  }
                  style={{
                    background:
                      "#dc3545",
                    color:
                      "white",
                    border:
                      "none",
                    borderRadius:
                      "6px",
                    padding:
                      "6px 10px",
                  }}
                >
                  🗑 Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GastosAvicolas;

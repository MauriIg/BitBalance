import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

const VentasPollo = () => {
  const [partes, setPartes] = useState([]);
  const [ventas, setVentas] = useState([]);

  const [formData, setFormData] = useState({
    parte: "",
    precioKg: 0,
    pesoKg: "",
    importe: "",
    tipoVenta: "peso",
    presentacion: "pieza",
  });

  useEffect(() => {
    obtenerPartes();
    obtenerVentas();
  }, []);

  const obtenerPartes = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/partes-pollo"
      );

      setPartes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerVentas = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/ventas-pollo"
      );

      setVentas(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const seleccionarParte = (nombre) => {
    const parte = partes.find(
      (p) => p.nombre === nombre
    );

    setFormData((prev) => ({
      ...prev,
      parte: nombre,
      precioKg: parte?.precioKg || 0,
    }));
  };

  // ⚖️ KG calculados
  const kgCalculados =
    formData.tipoVenta === "importe"
      ? Number(formData.importe || 0) /
        Number(formData.precioKg || 1)
      : Number(formData.pesoKg || 0);

  // 💰 Total calculado
  const total =
    formData.tipoVenta === "peso"
      ? Number(formData.pesoKg || 0) *
        Number(formData.precioKg || 0)
      : Number(formData.importe || 0);

  const guardarVenta = async () => {
    try {
      if (!formData.parte) {
        alert("Selecciona una parte");
        return;
      }

      const datos = {
        parte: formData.parte,
        presentacion:
          formData.presentacion,
        precioKg: Number(
          formData.precioKg
        ),
        pesoKg: Number(
          kgCalculados
        ),
        total: Number(total),
      };

      const res = await axiosInstance.post(
        "/api/ventas-pollo",
        datos
      );

      setVentas([
        res.data,
        ...ventas,
      ]);

      setFormData({
        parte: "",
        precioKg: 0,
        pesoKg: "",
        importe: "",
        tipoVenta: "peso",
        presentacion: "pieza",
      });
    } catch (error) {
      console.error(error);
      alert(
        "Error al guardar la venta"
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
      <h1>🛒 Ventas de Pollo</h1>

      <div
        style={{
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        {/* Parte */}
        <select
          value={formData.parte}
          onChange={(e) =>
            seleccionarParte(
              e.target.value
            )
          }
        >
          <option value="">
            Seleccionar parte
          </option>

          {partes.map((p) => (
            <option
              key={p._id}
              value={p.nombre}
            >
              {p.nombre}
            </option>
          ))}
        </select>

        {/* Presentación */}
        <select
          value={
            formData.presentacion
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              presentacion:
                e.target.value,
            })
          }
        >
          <option value="pieza">
            🍖 Pieza
          </option>

          <option value="entero">
            🐔 Pollo Entero
          </option>

          <option value="medio">
            🍗 Medio Pollo
          </option>

          <option value="cuarto">
            🍗 Cuarto de Pollo
          </option>
        </select>

        {/* Tipo de venta */}
        <select
          value={
            formData.tipoVenta
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              tipoVenta:
                e.target.value,
              pesoKg: "",
              importe: "",
            })
          }
        >
          <option value="peso">
            ⚖️ Venta por Peso
          </option>

          <option value="importe">
            💵 Venta por Importe
          </option>
        </select>

        {/* Peso o importe */}
        {formData.tipoVenta ===
        "peso" ? (
          <input
            type="number"
            step="0.001"
            placeholder="Peso KG"
            value={formData.pesoKg}
            onChange={(e) =>
              setFormData({
                ...formData,
                pesoKg:
                  e.target.value,
              })
            }
          />
        ) : (
          <input
            type="number"
            placeholder="Importe"
            value={formData.importe}
            onChange={(e) =>
              setFormData({
                ...formData,
                importe:
                  e.target.value,
              })
            }
          />
        )}

        {/* Precio */}
        <input
          disabled
          value={`$${formData.precioKg} por KG`}
        />

        <h3>
          ⚖️ KG:
          {" "}
          {kgCalculados.toFixed(
            3
          )}
        </h3>

        <h2>
          💰 Total: $
          {total.toFixed(2)}
        </h2>

        <button
          onClick={
            guardarVenta
          }
        >
          Guardar Venta
        </button>
      </div>

      <hr />

      <h2>
        📋 Historial de Ventas
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
          marginTop: "20px",
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
              Parte
            </th>

            <th style={thStyle}>
              Presentación
            </th>

            <th style={thStyle}>
              KG
            </th>

            <th style={thStyle}>
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {ventas.map((v) => (
            <tr key={v._id}>
              <td style={tdStyle}>
                {v.parte}
              </td>

              <td style={tdStyle}>
                {
                  v.presentacion
                }
              </td>

              <td style={tdStyle}>
                {Number(
                  v.pesoKg
                ).toFixed(3)}
              </td>

              <td style={tdStyle}>
                $
                {Number(
                  v.total
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VentasPollo;

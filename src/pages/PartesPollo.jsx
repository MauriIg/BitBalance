import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

const PartesPollo = () => {
  const [partes, setPartes] = useState([]);

  const [formData, setFormData] = useState({
    nombre: "",
    precioKg: "",
  });

  useEffect(() => {
    obtenerPartes();
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

  const crearParte = async () => {
    if (
      !formData.nombre ||
      !formData.precioKg
    ) {
      return alert(
        "Completa todos los campos"
      );
    }

    try {
      const datos = {
        nombre: formData.nombre,
        precioKg: Number(
          formData.precioKg
        ),
      };

      const res = await axiosInstance.post(
        "/api/partes-pollo",
        datos
      );

      setPartes([
        res.data,
        ...partes,
      ]);

      setFormData({
        nombre: "",
        precioKg: "",
      });
    } catch (error) {
      console.error(error);
      alert(
        "Error al guardar parte"
      );
    }
  };

  const thStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
    background: "#343a40",
    color: "white",
  };

  const tdStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        🍗 Catálogo de Partes
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Nombre de la parte"
          value={formData.nombre}
          onChange={(e) =>
            setFormData({
              ...formData,
              nombre: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Precio por KG"
          value={formData.precioKg}
          onChange={(e) =>
            setFormData({
              ...formData,
              precioKg: e.target.value,
            })
          }
        />

        <button
          onClick={crearParte}
        >
          💾 Guardar Parte
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>
              🍗 Parte
            </th>

            <th style={thStyle}>
              💰 Precio por KG
            </th>
          </tr>
        </thead>

        <tbody>
          {partes.map((p) => (
            <tr key={p._id}>
              <td style={tdStyle}>
                {p.nombre}
              </td>

              <td style={tdStyle}>
                $
                {Number(
                  p.precioKg
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartesPollo;
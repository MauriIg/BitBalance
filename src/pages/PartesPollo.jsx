import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

const PartesPollo = () => {
  const [partes, setPartes] = useState([]);

  const [formData, setFormData] = useState({
    nombre: "",
    precioKg: "",
    descripcion: "",
  });

  // 🔥 OBTENER
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

  // 🔥 CREAR
  const crearParte = async () => {
    try {
      const res = await axiosInstance.post(
        "/api/partes-pollo",
        formData
      );

      setPartes([res.data, ...partes]);

      setFormData({
        nombre: "",
        precioKg: "",
        descripcion: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🍗 Partes del Pollo</h1>

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
          type="text"
          placeholder="Nombre"
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

        <textarea
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={(e) =>
            setFormData({
              ...formData,
              descripcion: e.target.value,
            })
          }
        />

        <button onClick={crearParte}>
          Guardar Parte
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
            <th>Parte</th>
            <th>Precio KG</th>
            <th>Descripción</th>
          </tr>
        </thead>

        <tbody>
          {partes.map((p) => (
            <tr key={p._id}>
              <td>{p.nombre}</td>
              <td>${p.precioKg}</td>
              <td>{p.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartesPollo;

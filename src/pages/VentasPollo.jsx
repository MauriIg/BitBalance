import {
    useEffect,
    useState,
  } from "react";
  
  import axiosInstance from "../services/axiosInstance";
  
  const VentasPollo = () => {
    const [partes, setPartes] =
      useState([]);
  
    const [ventas, setVentas] =
      useState([]);
  
    const [formData, setFormData] =
      useState({
        parte: "",
        precioKg: 0,
        pesoKg: "",
      });
  
    useEffect(() => {
      obtenerPartes();
      obtenerVentas();
    }, []);
  
    const obtenerPartes =
      async () => {
        try {
          const res =
            await axiosInstance.get(
              "/api/partes-pollo"
            );
  
          setPartes(res.data);
        } catch (error) {
          console.error(error);
        }
      };
  
    const obtenerVentas =
      async () => {
        try {
          const res =
            await axiosInstance.get(
              "/api/ventas-pollo"
            );
  
          setVentas(res.data);
        } catch (error) {
          console.error(error);
        }
      };
  
    const seleccionarParte = (
      nombre
    ) => {
      const parte = partes.find(
        (p) => p.nombre === nombre
      );
  
      setFormData({
        ...formData,
        parte: nombre,
        precioKg:
          parte?.precioKg || 0,
      });
    };
  
    const total =
      Number(formData.pesoKg || 0) *
      Number(formData.precioKg);
  
    const guardarVenta =
      async () => {
        try {
          const datos = {
            parte: formData.parte,
            precioKg:
              formData.precioKg,
            pesoKg: Number(
              formData.pesoKg
            ),
            total,
          };
  
          const res =
            await axiosInstance.post(
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
          });
        } catch (error) {
          console.error(error);
        }
      };
  
    return (
      <div style={{ padding: 20 }}>
        <h1>
          🛒 Ventas de Pollo
        </h1>
  
        <div
          style={{
            maxWidth: 500,
            display: "flex",
            flexDirection:
              "column",
            gap: 10,
          }}
        >
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
  
          <input
            type="number"
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
  
          <input
            value={`$${formData.precioKg}`}
            disabled
          />
  
          <h2>
            Total:
            $
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
          Historial Ventas
        </h2>
  
        <table
          style={{
            width: "100%",
            marginTop: 20,
          }}
        >
          <thead>
            <tr>
              <th>Parte</th>
              <th>Peso</th>
              <th>Total</th>
            </tr>
          </thead>
  
          <tbody>
            {ventas.map((v) => (
              <tr key={v._id}>
                <td>{v.parte}</td>
  
                <td>
                  {v.pesoKg} KG
                </td>
  
                <td>
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
  
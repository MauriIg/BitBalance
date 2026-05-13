import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../services/axiosInstance";

// 📊 Recharts
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Estadisticas = () => {
  const { products } = useSelector((state) => state.product);

  const [ordenes, setOrdenes] = useState([]);
  const [reinversiones, setReinversiones] =
    useState([]);

  const [montoReinversion, setMontoReinversion] =
    useState("");

  const [loading, setLoading] = useState(true);

  // 🔥 OBTENER DATOS
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // 🔥 ÓRDENES
        const ordenesRes =
          await axiosInstance.get("/api/orders");
  
        setOrdenes(ordenesRes.data || []);
      } catch (error) {
        console.error(
          "Error obteniendo órdenes:",
          error
        );
  
        setOrdenes([]);
      }
  
      try {
        // 🔥 REINVERSIONES
        const reinversionesRes =
          await axiosInstance.get(
            "/api/reinversiones"
          );
  
        setReinversiones(
          reinversionesRes.data || []
        );
      } catch (error) {
        console.error(
          "Error obteniendo reinversiones:",
          error
        );
  
        setReinversiones([]);
      }
  
      setLoading(false);
    };
  
    obtenerDatos();
  }, []);

  // 🔥 PROTECCIÓN PRODUCTS
  const listaProductos = Array.isArray(products)
    ? products
    : [];

  // 💰 CAPITAL INICIAL
  const inversionInicial = listaProductos - totalReinvertido.reduce(
    (acc, p) => {
      return acc + Number(p.montoSolicitado || 0);
    },
    0
  );

  // 📈 CARTERA ACTIVA
  const deudaTotal = listaProductos.reduce(
    (acc, p) => {
      return (
        acc + Number(p.totalAPagar || p.precio || 0)
      );
    },
    0
  );

  // 💵 TOTAL RECAUDADO
  const totalRecaudado = ordenes.reduce(
    (acc, o) => {
      return acc + Number(o.total || 0);
    },
    0
  );

  // 🔄 TOTAL REINVERTIDO
  const totalReinvertido =
    reinversiones.reduce((acc, r) => {
      return acc + Number(r.monto || 0);
    }, 0);

  // 📈 CAPITAL TOTAL TRABAJANDO
  const capitalTrabajando =
    inversionInicial + totalReinvertido;

  // 💰 PATRIMONIO
  const patrimonio =
    totalRecaudado + deudaTotal;

  // 🔥 GANANCIA REAL
  const gananciaReal =
    patrimonio - inversionInicial;

  // 💵 DINERO DISPONIBLE
  const dineroDisponible =
    totalRecaudado - totalReinvertido;

  // 📈 RENDIMIENTO
  const rendimiento =
    capitalTrabajando > 0
      ? (
          (gananciaReal / capitalTrabajando) *
          100
        ).toFixed(2)
      : 0;

  // 📊 DATA GRÁFICA
  const data = [
    {
      name: "Capital trabajando",
      value: capitalTrabajando,
    },
    {
      name: "Recaudado",
      value: totalRecaudado,
    },
    {
      name: "Pendiente",
      value: deudaTotal,
    },
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FF8042",
  ];

  // 🔥 AGREGAR REINVERSIÓN
  const agregarReinversion = async () => {
    if (
      !montoReinversion ||
      Number(montoReinversion) <= 0
    ) {
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/api/reinversiones",
        {
          monto: Number(montoReinversion),
        }
      );

      // 🔥 ACTUALIZAR STATE
      setReinversiones([
        res.data,
        ...reinversiones,
      ]);

      setMontoReinversion("");
    } catch (error) {
      console.error(
        "Error al guardar reinversión:",
        error
      );
    }
  };

  // 🔥 LOADING
  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Estadísticas Financieras</h1>

      {/* 🔥 REINVERSIÓN */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="number"
          placeholder="Monto a reinvertir"
          value={montoReinversion}
          onChange={(e) =>
            setMontoReinversion(
              e.target.value
            )
          }
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={agregarReinversion}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            background: "#00C49F",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Reinvertir
        </button>
      </div>

      {/* 🔥 CARDS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <h3>💰 Capital Inicial</h3>
          <p>
            ${inversionInicial.toFixed(2)}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>🔄 Reinvertido</h3>
          <p>
            ${totalReinvertido.toFixed(2)}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>📈 Capital Trabajando</h3>
          <p>
            ${capitalTrabajando.toFixed(2)}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>💵 Recaudado</h3>
          <p>
            ${totalRecaudado.toFixed(2)}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>📊 Pendiente</h3>
          <p>${deudaTotal.toFixed(2)}</p>
        </div>

        <div style={cardStyle}>
          <h3>💸 Disponible</h3>
          <p>
            ${dineroDisponible.toFixed(2)}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>🔥 Ganancia Real</h3>

          <p
            style={{
              color:
                gananciaReal >= 0
                  ? "green"
                  : "red",

              fontWeight: "bold",
            }}
          >
            ${gananciaReal.toFixed(2)}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>📈 Rendimiento</h3>
          <p>{rendimiento}%</p>
        </div>
      </div>

      {/* 📊 GRÁFICA */}
      <div
        style={{
          width: "100%",
          height: "400px",
          marginTop: "40px",
        }}
      >
        <h2>📊 Distribución Financiera</h2>

        {data.every(
          (d) => d.value === 0
        ) ? (
          <p>No hay datos para mostrar</p>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {data.map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* 🔥 HISTORIAL */}
      <div style={{ marginTop: "40px" }}>
        <h2>
          📝 Historial de Reinversiones
        </h2>

        {reinversiones.length === 0 ? (
          <p>
            No hay reinversiones aún.
          </p>
        ) : (
          <ul>
            {reinversiones.map((r) => (
              <li key={r._id}>
                💰 $
                {Number(
                  r.monto
                ).toFixed(2)}{" "}
                -{" "}
                {new Date(
                  r.createdAt
                ).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// 🎨 ESTILO CARDS
const cardStyle = {
  flex: "1",
  minWidth: "220px",
  background: "#f8f9fa",
  padding: "15px",
  borderRadius: "10px",
  boxShadow:
    "0 2px 5px rgba(0,0,0,0.1)",
  textAlign: "center",
};

export default Estadisticas;
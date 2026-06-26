import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EstadisticasAvicola = () => {
  const [lotes, setLotes] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [gastos, setGastos] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      const [
        lotesRes,
        ventasRes,
        gastosRes,
      ] = await Promise.all([
        axiosInstance.get(
          "/api/lotes-pollos"
        ),

        axiosInstance.get(
          "/api/ventas-pollo"
        ),

        axiosInstance.get(
          "/api/gastos-avicolas"
        ),
      ]);

      setLotes(lotesRes.data);

      setVentas(ventasRes.data);

      setGastos(gastosRes.data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  //-------------------------------------
  // CÁLCULOS
  //-------------------------------------

  const pollosComprados =
    lotes.reduce(
      (acc, l) =>
        acc +
        Number(
          l.cantidadInicial
        ),
      0
    );

  const pollosVivos =
    lotes.reduce(
      (acc, l) =>
        acc +
        Number(
          l.cantidadActual
        ),
      0
    );

  const pollosMuertos =
    lotes.reduce(
      (acc, l) =>
        acc +
        Number(l.muertos),
      0
    );

  const inversion =
    lotes.reduce(
      (acc, l) =>
        acc +
        Number(
          l.costoCompra
        ),
      0
    );

  const totalVentas =
    ventas.reduce(
      (acc, v) =>
        acc +
        Number(v.total),
      0
    );

  const totalGastos =
    gastos.reduce(
      (acc, g) =>
        acc +
        Number(g.monto),
      0
    );

  const utilidad =
    totalVentas -
    inversion -
    totalGastos;

  const porcentajeMortalidad =
    pollosComprados === 0
      ? 0
      : (
          (pollosMuertos /
            pollosComprados) *
          100
        ).toFixed(2);

  //-------------------------------------
  // GRAFICA
  //-------------------------------------

  const data = [
    {
      name: "Ventas",
      value: totalVentas,
    },

    {
      name: "Compra",
      value: inversion,
    },

    {
      name: "Gastos",
      value: totalGastos,
    },
  ];

  const COLORS = [
    "#00C49F",
    "#0088FE",
    "#FF8042",
  ];

  if (loading)
    return (
      <p>Cargando...</p>
    );

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        📊 Estadísticas
        Avícolas
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>
            🐥 Comprados
          </h3>

          <p>
            {
              pollosComprados
            }
          </p>
        </div>

        <div style={cardStyle}>
          <h3>
            🐔 Vivos
          </h3>

          <p>
            {pollosVivos}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>
            ☠️ Muertos
          </h3>

          <p>
            {
              pollosMuertos
            }
          </p>
        </div>

        <div style={cardStyle}>
          <h3>
            📉 Mortalidad
          </h3>

          <p>
            {
              porcentajeMortalidad
            }
            %
          </p>
        </div>

        <div style={cardStyle}>
          <h3>
            💰 Compra
          </h3>

          <p>
            $
            {inversion.toFixed(
              2
            )}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>
            💸 Gastos
          </h3>

          <p>
            $
            {totalGastos.toFixed(
              2
            )}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>
            💵 Ventas
          </h3>

          <p>
            $
            {totalVentas.toFixed(
              2
            )}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>
            📈 Utilidad
          </h3>

          <p
            style={{
              color:
                utilidad >= 0
                  ? "green"
                  : "red",
              fontWeight:
                "bold",
            }}
          >
            $
            {utilidad.toFixed(
              2
            )}
          </p>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "400px",
          marginTop: "40px",
        }}
      >
        <h2>
          📈 Distribución
          Financiera
        </h2>

        {data.every(
          (d) =>
            d.value === 0
        ) ? (
          <p>
            Sin datos
          </p>
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
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
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
    </div>
  );
};

const cardStyle = {
  flex: "1",
  minWidth: "220px",
  background: "#f8f9fa",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow:
    "0 2px 5px rgba(0,0,0,.15)",
};

export default EstadisticasAvicola;

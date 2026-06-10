import { useNavigate } from "react-router-dom";

const Avicola = () => {
  const navigate = useNavigate();

  const cardStyle = {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    minWidth: "220px",
    textAlign: "center",
    transition: "0.2s",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🐔 Sistema Avícola</h1>

      <p>
        Administración de pollos,
        ventas y estadísticas.
      </p>

      {/* 🔥 CARDS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        {/* LOTES */}
        <div
          style={cardStyle}
          onClick={() =>
            navigate("/avicola/lotes")
          }
        >
          <h2>🐥 Lotes</h2>

          <p>
            Registrar pollitos y
            crecimiento
          </p>
        </div>

        {/* PARTES */}
        <div
          style={cardStyle}
          onClick={() =>
            navigate("/avicola/partes")
          }
        >
          <h2>🍗 Partes</h2>

          <p>
            Configurar precios por KG
          </p>
        </div>

        {/* VENTAS */}
        <div
          style={cardStyle}
          onClick={() =>
            navigate("/avicola/ventas")
          }
        >
          <h2>🧾 Ventas</h2>

          <p>
            Punto de venta avícola
          </p>
        </div>

        {/* GASTOS */}
        <div
          style={cardStyle}
          onClick={() =>
            navigate("/avicola/gastos")
          }
        >
          <h2>💸 Gastos</h2>

          <p>
            Alimento, vacunas y más
          </p>
        </div>

        {/* ESTADÍSTICAS */}
        <div
          style={cardStyle}
          onClick={() =>
            navigate(
              "/avicola/estadisticas"
            )
          }
        >
          <h2>📊 Estadísticas</h2>

          <p>
            Ganancias y rendimiento
          </p>
        </div>
      </div>
    </div>
  );
};

export default Avicola;

import { useNavigate } from "react-router-dom";

// 🔥 IMPORTA TU PNG
import pollosImg from "../assets/toto.png";

const Avicola = () => {
  const navigate = useNavigate();

  const cardStyle = {
    background: "var(--card)",
    padding: "25px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    minWidth: "220px",
    textAlign: "center",
    transition: "0.2s",
    color: "var(--text)",
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      {/* 🔥 IMAGEN IZQUIERDA */}
      <div
        style={{
          width: "35%",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <img
          src={pollosImg}
          alt="Avícola"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* 🔥 CONTENIDO DERECHO */}
      <div
        style={{
          width: "65%",
          padding: "30px",
        }}
      >
        <h1>Bienvenido al sistema Avicola "Don TOTO"</h1>

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
    </div>
  );
};

export default Avicola;

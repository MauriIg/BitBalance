// src/pages/Carrito.jsx
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  quitarDelCarrito,
  cambiarCantidad,
  vaciarCarrito,
  cargarCarrito
} from "../redux/slices/carritoSlice";

import { crearOrden } from "../services/orderService";
import { obtenerCarritoUsuario } from "../services/carritoService";
import axiosInstance from "../services/axiosInstance";
import { ESTADOS_ORDEN } from "../constants/orderEstados";

const Carrito = () => {
  const carrito = useSelector(state => state.carrito);
  const usuario = useSelector(state => state.auth?.user);
  const token = usuario?.token;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tipoEntrega, setTipoEntrega] = useState("tienda");
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [direccion, setDireccion] = useState("");
  const [referencias, setReferencias] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comentarios, setComentarios] = useState("");

  const total = carrito.reduce((acc, item) => {
    return acc + (item.cantidad || 0);
  }, 0);

  useEffect(() => {
    const fetchCarrito = async () => {
      if (!token) return;

      try {
        const carritoGuardado = await obtenerCarritoUsuario(token);

        if (carritoGuardado?.productos) {
          dispatch(cargarCarrito(carritoGuardado.productos));
        }
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
      }
    };

    fetchCarrito();
  }, [token, dispatch]);

  const handleFinalizarCompra = async () => {
    if (!usuario) {
      alert("Inicia sesión para finalizar la compra");
      return navigate("/login");
    }

    const productosFormateados = carrito
      .filter(p => p._id)
      .map(p => ({
        producto: p._id,
        abono: p.cantidad,
      }));

    let estadoInicial =
      tipoEntrega === "tienda"
        ? metodoPago === "tarjeta"
          ? ESTADOS_ORDEN.PAGADO
          : ESTADOS_ORDEN.PENDIENTE_RECOGER
        : metodoPago === "tarjeta"
        ? ESTADOS_ORDEN.PAGADO
        : ESTADOS_ORDEN.PENDIENTE_PAGO;

    if (tipoEntrega === "domicilio" && (!direccion || !telefono)) {
      return alert("Completa dirección y teléfono.");
    }

    try {
      await crearOrden(
        {
          productos: productosFormateados,
          total,
          tipoEntrega,
          direccion: tipoEntrega === "domicilio" ? direccion : "",
          referencias: tipoEntrega === "domicilio" ? referencias : "",
          telefono: tipoEntrega === "domicilio" ? telefono : "",
          metodoPago,
          estado: estadoInicial,
          comentarios,
        },
        token
      );

      dispatch(vaciarCarrito());
      alert("Pago registrado con éxito");
      navigate("/products");
    } catch (error) {
      console.error(error);
      alert("Error al registrar el pago");
    }
  };

  const handleStripeCheckout = async () => {
    if (!usuario?._id) {
      alert("Debes iniciar sesión para pagar.");
      return navigate("/login");
    }

    try {
      const res = await axiosInstance.post(
        "/api/payment/create-checkout-session",
        {
          cartItems: carrito.map(p => ({
            productoId: p._id,
            nombre: p.nombre,
            precio: p.precio,
            quantity: p.cantidad,
          })),
          usuarioId: usuario._id,
          tipoEntrega,
          direccion: tipoEntrega === "domicilio" ? direccion : "",
          referencias: tipoEntrega === "domicilio" ? referencias : "",
          telefono: tipoEntrega === "domicilio" ? telefono : "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.error("Stripe error:", err);
      alert("Error al iniciar el pago");
    }
  };

  // 🔥 STYLES
  const styles = {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial",
    },
    title: {
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "15px",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "15px",
      marginBottom: "12px",
      display: "flex",
      gap: "15px",
      alignItems: "center",
    },
    img: {
      width: "90px",
      height: "90px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    input: {
      padding: "6px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      width: "80px",
    },
    button: {
      padding: "8px 12px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "5px",
    },
    btnDanger: {
      background: "#e74c3c",
      color: "white",
    },
    btnPrimary: {
      background: "#2ecc71",
      color: "white",
    },
    section: {
      marginTop: "20px",
      padding: "10px",
      borderTop: "1px solid #eee",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧾 Registro de Pago Semanal</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {carrito.map(item => {
            const producto = item.producto || item;

            return (
              <div key={producto._id} style={styles.card}>
                {producto.imagen && (
                  <img src={producto.imagen} alt="" style={styles.img} />
                )}

                <div style={{ flex: 1 }}>
                  <h4>{producto.nombre || "Sin nombre"}</h4>
                  <p>Deuda: ${producto.precio || 0}</p>

                  <label>
                    Abono:{" "}
                    <input
                      type="number"
                      style={styles.input}
                      value={item.cantidad}
                      onChange={e =>
                        dispatch(
                          cambiarCantidad({
                            id: producto._id,
                            cantidad: Number(e.target.value),
                          })
                        )
                      }
                    />
                  </label>

                  <br />

                  <button
                    style={{ ...styles.button, ...styles.btnDanger }}
                    onClick={() => dispatch(quitarDelCarrito(producto._id))}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}

          {/* ENTREGA */}
          <div style={styles.section}>
            <h4>📍 Tipo de entrega</h4>

            <select
              value={tipoEntrega}
              onChange={e => setTipoEntrega(e.target.value)}
            >
              <option value="tienda">Domicilio Fijado</option>
              <option value="domicilio">Otra dirección</option>
            </select>

            {tipoEntrega === "domicilio" && (
              <div>
                <input
                  placeholder="Dirección"
                  value={direccion}
                  onChange={e => setDireccion(e.target.value)}
                />
                <input
                  placeholder="Referencias"
                  value={referencias}
                  onChange={e => setReferencias(e.target.value)}
                />
                <input
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={e => setTelefono(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* PAGO */}
          <div style={styles.section}>
            <h4>💳 Método de pago</h4>

            <select
              value={metodoPago}
              onChange={e => setMetodoPago(e.target.value)}
            >
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
          </div>

          {/* COMENTARIOS */}
          <div style={styles.section}>
            <textarea
              placeholder="Comentarios..."
              value={comentarios}
              onChange={e => setComentarios(e.target.value)}
              style={{
                width: "100%",
                height: "80px",
                padding: "10px",
              }}
            />
          </div>

          <h3>💰 Total abono: ${total.toFixed(2)}</h3>

          <button
            style={{ ...styles.button, background: "#555", color: "white" }}
            onClick={() => dispatch(vaciarCarrito())}
          >
            Limpiar carrito
          </button>

          <br /><br />

          {metodoPago !== "tarjeta" ? (
            <button
              style={{ ...styles.button, ...styles.btnPrimary }}
              onClick={handleFinalizarCompra}
            >
              Registrar pago
            </button>
          ) : (
            <button
              style={{ ...styles.button, background: "#3498db", color: "white" }}
              onClick={handleStripeCheckout}
            >
              Pagar con tarjeta
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Carrito;

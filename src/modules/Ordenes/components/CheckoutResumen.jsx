// src/modules/Ordenes/components/CheckoutResumen.jsx
import { useAuth } from "../../../context/authContext";
import { useCrearOrden } from "../hooks/useCrearOrden";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../Cart/context/CartContext";

export default function CheckoutResumen({ productos, total }) {
    const { refreshCart } = useCartContext();
  const { user } = useAuth();
  const { crearOrden, loading } = useCrearOrden();
  const navigate = useNavigate();

  const handleComprar = async () => {
    if (!user) return alert("Debes iniciar sesión");

    const confirm = window.confirm("¿Confirmas la compra?");
    if (!confirm) return;

    const result = await crearOrden({
      userId: user.id,
      direccion: user.direccion,
      metodoPago: "BancoSimple", // por ahora mock fijo
    });

    if (result.success) {
      alert("¡Compra realizada con éxito!");
      navigate("/perfil", { state: { seccion: "compras" } });
    } else {
      alert("Hubo un error: " + result.message);
    }
  };

  return (
    <div className="card shadow-sm p-3">
      <h6 className="fw-bold mb-3 text-center">Resumen del pedido</h6>

      <ul className="list-group mb-3">
        {productos.map((p) => (
          <li
            key={p.productoId || p.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{p.nombreProducto || p.title}</strong>
              <br />
              <small className="text-muted">
                Cantidad: {p.cantidad || p.qty}
              </small>
            </div>
            <span className="text-success fw-bold">
              $
              {(
                (p.precioUnitario || parseFloat(p.price?.replace("$", ""))) *
                (p.cantidad || p.qty)
              ).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between border-top pt-2 mb-3">
        <strong>Total</strong>
        <strong className="text-success">${total.toFixed(2)}</strong>
      </div>

      <div className="d-grid mt-4">
        <button
          className="btn btn-green-custom btn-lg"
          onClick={handleComprar}
          disabled={loading}
        >
          {loading ? "Procesando..." : "Comprar"}
        </button>
      </div>
    </div>
  );
}

import { useCrearOrden } from "../../Ordenes/hooks/useCrearOrden";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../Cart/context/CartContext";

export default function CheckoutResumen({ productos, metodoPago }) {
  const { user } = useAuth();
  const { crearOrden, loading } = useCrearOrden();
  const navigate = useNavigate();
  const { vaciarCarrito, refreshCart } = useCartContext();

  const handleComprar = async () => {
    if (!metodoPago) {
      alert("Debes seleccionar un método de pago.");
      return;
    }

    const detalles = productos.map((p) => ({
      productoId: p.productoId || p.id,
      nombreProducto: p.nombreProducto || p.title,
      cantidad: p.cantidad || p.qty,
      precioUnitario:
        p.precioUnitario ?? parseFloat(p.price?.replace("$", ""))
    }));

    const total = detalles.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );

    const response = await crearOrden({
      userId: user.id,
      total,
      estado: "PENDIENTE",
      detalles
    });

    if (response.success) {
      navigate("/perfil", { state: { seccion: "compras" } });
      await vaciarCarrito(); // 🧹 ahora sí, limpiar desde backend
      await refreshCart(); // 🧹 limpiar el carrito en el frontend
    } else {
      alert("Hubo un error al crear la orden.");
    }
  };

  const totalCalculado = productos.reduce((acc, p) => {
    const precio = parseFloat(p.precioUnitario || p.price?.replace("$", ""));
    const cantidad = p.cantidad || p.qty;
    return acc + precio * cantidad;
  }, 0);

  return (
    <div className="card shadow-sm p-3">
      <h6 className="fw-bold mb-3">Resumen del pedido</h6>

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
                (p.precioUnitario ||
                  parseFloat(p.price?.replace("$", ""))) *
                (p.cantidad || p.qty)
              ).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between border-top pt-2">
        <strong>Total</strong>
        <strong className="text-success">
          ${totalCalculado.toFixed(2)}
        </strong>
      </div>

      <div className="d-grid mt-4">
        <button
          className="btn btn-warning btn-lg"
          disabled={loading}
          onClick={handleComprar}
        >
          {loading ? "Procesando..." : "Comprar"}
        </button>
      </div>
    </div>
  );
}

// src/modules/Ordenes/components/MetodoPagoForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearOrden } from "../services/ordenService";
import { useCartContext } from "../../Cart/context/CartContext";
import { useAuth } from "../../../context/authContext";

export default function MetodoPagoForm() {
  const [metodoPago, setMetodoPago] = useState(null);
  const [loading, setLoading] = useState(false);
  const { cartItems, refreshCart } = useCartContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleComprar = async () => {
    if (!metodoPago) {
      alert("Por favor, selecciona un método de pago.");
      return;
    }

    const total = cartItems.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );

    const detalles = cartItems.map((item) => ({
      productoId: item.productoId,
      nombreProducto: item.nombreProducto,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
    }));

    const ordenData = {
      compradorId: user.id,
      total,
      estado: "PENDIENTE",
      detalles,
    };

    try {
      setLoading(true);
      await crearOrden(ordenData);
      refreshCart(); // Vaciar carrito
      navigate("/perfil/compras");
    } catch (error) {
      alert("Hubo un error al crear la orden.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h5>Selecciona un método de pago</h5>
      <div className="d-flex gap-3 my-3">
        <div
          className={`card p-3 ${metodoPago === "BancoSimple" ? "border-primary" : ""}`}
          onClick={() => setMetodoPago("BancoSimple")}
          style={{ cursor: "pointer" }}
        >
          <h6>BancoSimple</h6>
          <p className="text-muted">Mock de pago</p>
        </div>
        {/* Puedes agregar más métodos de pago aquí */}
      </div>
      <button
        className="btn btn-success"
        onClick={handleComprar}
        disabled={loading}
      >
        {loading ? "Procesando..." : "Comprar"}
      </button>
    </div>
  );
}

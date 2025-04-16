import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useAddToCart } from "../../Cart/hooks/useAddToCart";
import ToastSuccess from "../../../components/ToastSuccess";
import { useCartContext } from "../../Cart/context/CartContext";

export default function ProductInfo({ title, price, productoId }) {
  const { user } = useAuth();
  const { addToCart, loading } = useAddToCart(user?.id);
  const [cantidad, setCantidad] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const { refreshCart } = useCartContext();

  const handleAddToCart = async () => {
    if (!user) return alert("Debes iniciar sesión para agregar productos al carrito.");

    const { success } = await addToCart(productoId, cantidad);

    if (success) {
      setShowToast(true);
      refreshCart(); 
    } else {
      alert("No se pudo agregar al carrito.");
    }
  };

  const handleBuyNow = async () => {
    if (!user) return alert("Debes iniciar sesión para continuar con la compra.");
    const { success } = await addToCart(productoId, cantidad);

    if (success) {
      setShowToast(true);
      refreshCart(); 
      navigate("/carrito");
    } else {
      alert("No se pudo agregar al carrito.");
    }
    
  };

  return (
    <>
      <ToastSuccess
        show={showToast}
        onClose={() => setShowToast(false)}
        message="Producto agregado al carrito con éxito"
      />

      <h2 className="fw-bold mb-3">{title}</h2>
      <p className="text-success h4 fw-bold">{price}</p>

      <div className="mt-3">
        <div className="input-group mb-3">
          <span className="input-group-text">Cantidad</span>
          <input
            type="number"
            className="form-control"
            min="1"
            value={cantidad}
            onChange={(e) =>
              setCantidad(Math.max(1, parseInt(e.target.value) || 1))
            }
          />
        </div>

        <button className="btn btn-warning w-100 mb-2" onClick={handleBuyNow}>
          Comprar ahora
        </button>
        <button
          className="btn btn-outline-secondary w-100"
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar al carrito"}
        </button>
      </div>

      <ul className="mt-3 list-unstyled small text-muted">
        <li>Envío gratis a todo el país</li>
        <li>Devolución gratis dentro de 30 días</li>
      </ul>
    </>
  );
}

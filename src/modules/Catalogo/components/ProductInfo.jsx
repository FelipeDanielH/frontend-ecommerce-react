import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useAddToCart } from "../../Cart/hooks/useAddToCart";
import ToastSuccess from "../../../components/ToastSuccess";
import { useCartContext } from "../../Cart/context/CartContext";

export default function ProductInfo({ title, price, productoId, stock, vendedor }) {
  const { user } = useAuth();
  const { addToCart, loading } = useAddToCart(user?.id);
  const [cantidad, setCantidad] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [errorStock, setErrorStock] = useState(null);
  const navigate = useNavigate();
  const { refreshCart } = useCartContext();

  const handleChangeCantidad = (e) => {
    const value = parseInt(e.target.value) || 1;

    if (value > stock) {
      setCantidad(stock);
      setErrorStock(`Solo hay ${stock} unidades disponibles`);
    } else {
      setCantidad(Math.max(1, value));
      setErrorStock(null);
    }
  };

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

  const sinStock = stock === 0;

  return (
    <>
      <ToastSuccess
        show={showToast}
        onClose={() => setShowToast(false)}
        message="Producto agregado al carrito con éxito"
      />

      <h2 className="fw-bold mb-3">{title}</h2>
      <p className="text-success h4 fw-bold">{price}</p>
      {sinStock ? (
        <p className="text-danger fw-bold">Producto sin stock</p>
      ) : (
        <p className="mb-1 text-muted">Stock disponible: <strong>{stock}</strong></p>
      )}
      <p className="mb-3 text-muted">Vendido por: <strong>{vendedor}</strong></p>

      <div className="mt-3">
        <div className="input-group mb-2">
          <span className="input-group-text">Cantidad</span>
          <input
            type="number"
            className="form-control"
            min="1"
            max={stock}
            value={cantidad}
            onChange={handleChangeCantidad}
            disabled={sinStock}
          />
        </div>

        {errorStock && <p className="text-danger small">{errorStock}</p>}

        <button
          className="btn btn-green-custom w-100 mb-2"
          onClick={handleBuyNow}
          disabled={sinStock || cantidad > stock}
        >
          Comprar ahora
        </button>

        <button
          className="btn btn-outline-secondary w-100"
          onClick={handleAddToCart}
          disabled={loading || sinStock || cantidad > stock}
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

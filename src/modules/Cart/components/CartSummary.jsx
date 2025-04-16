// src/modules/Cart/components/CartSummary.jsx
import { useNavigate } from "react-router-dom";

export default function CartSummary({ total }) {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-light p-3 rounded shadow-sm">
      <h5 className="fw-bold mb-3">Resumen del pedido</h5>
      <div className="d-flex justify-content-between mb-2">
        <span>Subtotal</span>
        <span>{total}</span>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <span>Envío</span>
        <span>Gratis</span>
      </div>
      <div className="d-flex justify-content-between fw-bold border-top pt-2 mb-3">
        <span>Total</span>
        <span>{total}</span>
      </div>

      <button className="btn btn-warning w-100" onClick={handleProceed}>
        Proceder al pago
      </button>
    </div>
  );
}

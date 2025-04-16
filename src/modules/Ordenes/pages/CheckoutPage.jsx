// CheckoutPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../Cart/context/CartContext";
import MetodoPagoForm from "../../OrdenCompra/components/MetodoPagoForm";
import CheckoutResumen from "../../OrdenCompra/components/CheckoutResumen";

export default function CheckoutPage() {
  const { cartItems } = useCartContext();
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState(null); // 👈

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/catalogo");
    }
  }, [cartItems]);

  return (
    <div className="container my-5">
      <h4 className="fw-bold text-center mb-4">Finalizar compra</h4>

      <div className="row">
        <div className="col-md-8">
          <MetodoPagoForm metodoPago={metodoPago} setMetodoPago={setMetodoPago} />
        </div>
        <div className="col-md-4">
          <CheckoutResumen productos={cartItems} metodoPago={metodoPago} />
        </div>
      </div>
    </div>
  );
}

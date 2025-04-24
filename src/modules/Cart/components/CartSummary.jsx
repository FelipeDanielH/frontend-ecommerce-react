// src/modules/Cart/components/CartSummary.jsx
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../Cart/context/CartContext";

export default function CartSummary({ total }) {
  const navigate = useNavigate();
  const { cartItems } = useCartContext();

  const handleProceed = async () => {
    try {
      const errores = [];
  
      for (const item of cartItems) {
        const res = await fetch(`http://localhost:8080/productos/${item.id}`);
        const producto = await res.json();
  
        if (producto.stock < item.qty) {
          if (producto.stock === 0) {
            errores.push(`❌ ${item.title} está agotado`);
          }else{
            errores.push(`❌ ${item.title} solo tiene ${producto.stock} en stock (querías ${item.qty})`);
          }
          
        }
      }
  
      if (errores.length > 0) {
        alert(`No se puede continuar con la compra:\n\n${errores.join("\n")}`);
        window.location.reload(); // ⚠️ forzar recarga del carrito actualizado
        return;
      }
  
      navigate("/checkout");
    } catch (err) {
      alert("Error al verificar stock. Intenta nuevamente.");
      console.error(err);
    }
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

      <button className="btn btn-green-custom w-100" onClick={handleProceed}>
        Proceder al pago
      </button>
    </div>
  );
}

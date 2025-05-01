import { useAuth } from '../../../context/authContext';
import useCart from '../hooks/useCart';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

export default function CartPage() {
  const { user } = useAuth();
  const userId = user?.id; 

  const {
    cartItems,
    totalFormatted,
    loading,
    removeFromCart,
    updateCantidad,
  } = useCart(userId);


  return (
    <main className="container my-5 flex-grow-1">
      <h4 className="fw-bold mb-4">Tu carrito</h4>

      {!userId ? (
        <p>Debes iniciar sesión para ver tu carrito.</p>
      ) : loading ? (
        <p>Cargando carrito...</p>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onCantidadChange={updateCantidad}
              />
            ))}
          </div>
          <div className="col-md-4">
            <CartSummary total={totalFormatted} />
          </div>
        </div>
      )}
    </main>
  );
}

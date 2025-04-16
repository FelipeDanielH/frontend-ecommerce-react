import { createContext, useContext, useEffect, useState } from "react";
import { cartService } from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children, userId }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!userId) return;
    setLoading(true);
    const data = await cartService.getCart(userId);
    setCartItems(data);
    setLoading(false);
  };

  const refreshCart = () => fetchCart();

  const vaciarCarrito = async () => {
    if (!userId) return;
    setLoading(true);
    await cartService.vaciarCarrito(userId);
    setCartItems([]); // limpiar el estado local
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const cantidadItems = cartItems.length;

  return (
    <CartContext.Provider
      value={{ cartItems, refreshCart, vaciarCarrito, cantidadItems, loading }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}

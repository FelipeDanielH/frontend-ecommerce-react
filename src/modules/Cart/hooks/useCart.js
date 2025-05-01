// src/hooks/useCart.js
import { useEffect, useState, useCallback } from 'react';
import { useCartContext } from "../../Cart/context/CartContext";

const API_URL = import.meta.env.VITE_API_URL

export default function useCart(usuarioId) {
  const { refreshCart } = useCartContext();
  const [cartItems, setCartItems] = useState([]);
  const [totalFormatted, setTotalFormatted] = useState('$0.00');
  const [loading, setLoading] = useState(true);
  

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/carrito/${usuarioId}`);
      const data = await res.json();

      const detalles = data.detalles || [];

      const productosCompletos = await Promise.all(
        detalles.map(async (detalle) => {
          const resProd = await fetch(`${API_URL}/productos/${detalle.productoId}`);
          const producto = await resProd.json();

          return {
            id: detalle.productoId,
            title: detalle.productoNombre,
            price: `$${detalle.precioUnitario.toFixed(2)}`,
            qty: detalle.cantidad,
            img: `https://via.placeholder.com/100x100?text=${encodeURIComponent(producto.nombre)}`,
            total: detalle.precioUnitario * detalle.cantidad,
            stock: producto.stock,
            vendedor: producto.vendedorId,
          };
        })
      );

      const total = productosCompletos.reduce((acc, prod) => acc + prod.total, 0);
      setCartItems(productosCompletos);
      setTotalFormatted(`$${total.toFixed(2)}`);
    } catch (err) {
      console.error('Error al cargar el carrito:', err);
    } finally {
      setLoading(false);
    }
  }, [usuarioId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const removeFromCart = async (productoId) => {
    try {
      const res = await fetch(
        `${API_URL}/carrito/${usuarioId}/producto/${productoId}`,
        {
          method: 'DELETE',
        }
      );

      if (res.status === 204) {
        await fetchCart();
        refreshCart(); 
      } else {
        console.error('No se pudo eliminar el producto del carrito');
      }
    } catch (err) {
      console.error('Error al eliminar producto del carrito:', err);
    }
  };

  const updateCantidad = async (productoId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    try {
      const res = await fetch(`${API_URL}/carrito/${usuarioId}/producto`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productoId,
          cantidad: nuevaCantidad,
        }),
      });

      if (!res.ok) {
        console.error('No se pudo actualizar la cantidad');
        return;
      }

      await fetchCart(); // recarga el carrito actualizado
    } catch (err) {
      console.error('Error al actualizar la cantidad:', err);
    }
  };

  const cantidadItems = cartItems.length;

  return { cartItems, totalFormatted, loading, removeFromCart, updateCantidad, cantidadItems };
}

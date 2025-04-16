// src/modules/Cart/hooks/useAddToCart.js
import { useState } from 'react';
import { cartService } from '../services/cartService';

export function useAddToCart(usuarioId) {
  const [loading, setLoading] = useState(false);

  const addToCart = async (productoId, cantidad) => {
    setLoading(true);
    try {
      const result = await cartService.addToCart(usuarioId, productoId, cantidad);
      return { success: true, data: result };
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading };
}

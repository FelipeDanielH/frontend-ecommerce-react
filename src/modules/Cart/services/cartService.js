const API_URL = import.meta.env.VITE_API_URL

export const cartService = {
  async addToCart(usuarioId, productoId, cantidad) {
    const response = await fetch(`${API_URL}/carrito/${usuarioId}/agregar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productoId, cantidad }),
    });

    if (!response.ok) {
      throw new Error('No se pudo agregar al carrito');
    }

    return await response.json(); // devuelve el carrito actualizado
  },

  async getCart(usuarioId) {
    const response = await fetch(`${API_URL}/carrito/${usuarioId}`);
    if (!response.ok) {
      throw new Error('No se pudo obtener el carrito');
    }

    const data = await response.json();
    return data.detalles.map((detalle) => ({
      id: detalle.productoId,
      title: detalle.productoNombre,
      price: `$${detalle.precioUnitario.toFixed(2)}`,
      qty: detalle.cantidad,
      img: `https://via.placeholder.com/100x100?text=${encodeURIComponent(detalle.productoNombre)}`,
    }));
  },

  async vaciarCarrito(userId) {
    const res = await fetch(`${API_URL}/carrito/${userId}/vaciar`, {
      method: "DELETE",
    });
  
    if (!res.ok) {
      throw new Error("No se pudo vaciar el carrito");
    }
  
    // Si el backend responde 204, no hay JSON para parsear
    if (res.status === 204) return;
  
    // En caso de que devuelva algo útil (por si acaso)
    return await res.json();
  }
  
};

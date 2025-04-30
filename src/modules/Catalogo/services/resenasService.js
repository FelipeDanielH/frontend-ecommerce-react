const API_URL = import.meta.env.VITE_API_URL

export async function getReseñasPorProducto(productoId) {
  const res = await fetch(`${API_URL}/resenas/producto/${productoId}`);
  if (!res.ok) throw new Error("No se pudo obtener las reseñas");
  return await res.json();
}

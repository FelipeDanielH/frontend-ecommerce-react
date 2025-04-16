export async function getReseñasPorProducto(productoId) {
  const res = await fetch(`http://localhost:8080/resenas/producto/${productoId}`);
  if (!res.ok) throw new Error("No se pudo obtener las reseñas");
  return await res.json();
}

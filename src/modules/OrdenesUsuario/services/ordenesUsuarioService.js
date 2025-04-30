const API_URL = import.meta.env.VITE_API_URL

export async function getOrdenesUsuario(idUsuario) {
  const res = await fetch(`${API_URL}/ordenes/usuario/${idUsuario}`);
  if (!res.ok) throw new Error("Error al obtener órdenes");
  return res.json();
}

export async function getImagenProducto(idProducto) {
  const res = await fetch(`${API_URL}/imagenes-producto/${idProducto}`);
  if (!res.ok) return null; // tolerancia a productos sin imagen
  const data = await res.json();
  return data.urlImagen;
}
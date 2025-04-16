const BASE_URL = "http://localhost:8080";

export async function getOrdenesUsuario(idUsuario) {
  const res = await fetch(`${BASE_URL}/ordenes/usuario/${idUsuario}`);
  if (!res.ok) throw new Error("Error al obtener órdenes");
  return res.json();
}

export async function getImagenProducto(idProducto) {
  const res = await fetch(`${BASE_URL}/imagenes-producto/${idProducto}`);
  if (!res.ok) return null; // tolerancia a productos sin imagen
  const data = await res.json();
  return data.urlImagen;
}

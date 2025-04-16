export async function fetchCategorias() {
    const res = await fetch("http://localhost:8080/categorias");
    if (!res.ok) throw new Error("Error al obtener categorías");
    return await res.json();
  }
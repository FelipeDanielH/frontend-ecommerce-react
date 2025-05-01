// src/modules/Catalogo/services/categoriasService.js
const API_URL = import.meta.env.VITE_API_URL

export async function fetchCategorias() {
    const res = await fetch(`${API_URL}/categorias`);
    if (!res.ok) throw new Error("Error al obtener categorías");
    return await res.json();
  }
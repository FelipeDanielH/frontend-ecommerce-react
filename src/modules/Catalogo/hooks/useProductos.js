// src/modules/Catalogo/hooks/useProductos.js
import { useEffect, useState } from "react";
import { fetchProductosPorCategoria } from "../services/productosService";

export function useProductos({ categoriaPadreId, categoriaHijaId, categoriasHijas }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoriaPadreId) {
      setProductos([]);
      return;
    }

    setLoading(true);

    // Si hay hija seleccionada, solo hacemos fetch a esa hija
    if (categoriaHijaId) {
      fetchProductosPorCategoria(categoriaHijaId)
        .then(setProductos)
        .catch(err => {
          console.error("Error al obtener productos (hija):", err);
          setProductos([]);
        })
        .finally(() => setLoading(false));
    } else {
      // Sin hija seleccionada → hacemos fetch al padre + hijas
      const fetches = [
        fetchProductosPorCategoria(categoriaPadreId),
        ...categoriasHijas.map((hija) => fetchProductosPorCategoria(hija.id))
      ];

      Promise.all(fetches)
        .then((resultados) => {
          // Aplanamos los arrays de productos de padre + hijas
          const todos = resultados.flat();
          setProductos(todos);
        })
        .catch(err => {
          console.error("Error al obtener productos (padre + hijas):", err);
          setProductos([]);
        })
        .finally(() => setLoading(false));
    }
  }, [categoriaPadreId, categoriaHijaId, categoriasHijas]);

  return { productos, loading };
}

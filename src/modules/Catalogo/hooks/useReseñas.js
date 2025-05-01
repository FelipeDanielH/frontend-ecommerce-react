// src/modules/Catalogo/hooks/useReseñas.js
import { useEffect, useState } from "react";
import { getReseñasPorProducto } from "../services/resenasService";

export function useReseñas(productoId) {
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productoId) return;

    setLoading(true);
    getReseñasPorProducto(productoId)
      .then(setReseñas)
      .catch((err) => console.error("Error cargando reseñas", err))
      .finally(() => setLoading(false));
  }, [productoId]);

  return { reseñas, loading };
}

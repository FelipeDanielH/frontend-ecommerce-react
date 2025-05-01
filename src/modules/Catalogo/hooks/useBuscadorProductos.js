import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useBuscadorProductos(termino) {
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (!termino || termino.trim() === "") {
      setResultados([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    if (timeoutId) clearTimeout(timeoutId);

    const id = setTimeout(async () => {
      try {
        const res = await fetch(`${API_URL}/productos/buscar?nombre=${encodeURIComponent(termino)}`);
        if (!res.ok) throw new Error("Error al buscar productos");
        const data = await res.json();
        setResultados(data);
      } catch (err) {
        console.error("[useBuscadorProductos]", err);
        setResultados([]);
      } finally {
        setLoading(false);
      }
    }, 500); // debounce de 500ms

    setTimeoutId(id);
  }, [termino]);

  return { resultados, loading };
}

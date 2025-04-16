import { useEffect, useState } from "react";
import { fetchProductoById } from "../services/productosService";

export function useProductDetails(id) {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProductoById(id)
      .then(setProducto)
      .finally(() => setLoading(false));
  }, [id]);

  return { producto, loading };
}

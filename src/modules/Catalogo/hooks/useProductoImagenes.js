// modules/Catalogo/hooks/useProductoImagenes.js
import { useEffect, useState } from 'react';
import { getImagenesPorProducto } from '../services/productosService';

export function useProductoImagenes(productoId) {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productoId) return;

    setLoading(true);
    getImagenesPorProducto(productoId)
      .then(setImagenes)
      .catch((err) => console.error('Error cargando imágenes del producto:', err))
      .finally(() => setLoading(false));
  }, [productoId]);

  console.log("🖼️ Imagenes recibidas:", imagenes);

  return { imagenes, loading };
}

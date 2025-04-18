import { useEffect, useState } from "react";

export const useProductoImagen = (productoId) => {
  const [imagenUrl, setImagenUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productoId) return;

    const fetchImagen = async () => {
      try {
        const response = await fetch(`http://localhost:8080/imagenes-producto/${productoId}`);
        const data = await response.json();

        if (data?.urlImagen) {
          setImagenUrl(data.urlImagen);
        } else {
          throw new Error("No se encontró la URL de la imagen");
        }
      } catch (error) {
        console.error(`[useProductoImagen] Error al cargar imagen del producto ${productoId}:`, error);
        setImagenUrl(null); 
      } finally {
        setLoading(false);
      }
    };

    fetchImagen();
  }, [productoId]);

  return { imagenUrl, loading };
};
import { useState } from "react";
import { useAuth } from "../../../context/authContext";

const API_URL = import.meta.env.VITE_API_URL

export function useCrearProducto() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const crearProducto = async ({ nombre, descripcion, precio, stock, estado, categoriaId, imagenes }, toastSuccess, toastError, navigate) => {
    setLoading(true);

    if (!nombre || !descripcion || !precio || !stock || !estado || !categoriaId || imagenes.length === 0 || !imagenes[0]) {
      toastError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    try {
      const productoRes = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio: parseFloat(precio),
          stock: parseInt(stock),
          estado,
          vendedorId: user.id,
          categoriaId: parseInt(categoriaId),
        }),
      });

      if (!productoRes.ok) throw new Error("Error al crear producto");
      const producto = await productoRes.json();

      const imagenPayload = imagenes
        .filter((url) => url.trim() !== "")
        .map((url) => ({ urlImagen: url }));

      const imagenRes = await fetch(`${API_URL}/imagenes-producto/productos/${producto.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imagenPayload),
      });

      if (!imagenRes.ok) throw new Error("Error al guardar imágenes");

      toastSuccess("Producto creado correctamente ✅");
      navigate("/dashboard/productos");

    } catch (err) {
      console.error("❌", err);
      toastError("Hubo un error al crear el producto.");
    } finally {
      setLoading(false);
    }
  };

  return { crearProducto, loading };
}

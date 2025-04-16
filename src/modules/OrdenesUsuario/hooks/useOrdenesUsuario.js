import { useEffect, useState } from "react";
import { getOrdenesUsuario, getImagenProducto } from "../services/ordenesUsuarioService";
import { useAuth } from "../../../context/authContext"; // Asumiendo que tenemos un contexto de auth

export function useOrdenesUsuario() {
  const { user } = useAuth(); // asumiendo que tiene id
  const [activas, setActivas] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    

    const fetchData = async () => {
      try {
        const ordenes = await getOrdenesUsuario(user.id);

        const ordenesConImagenes = await Promise.all(
          ordenes.map(async (orden) => {
            const productos = await Promise.all(
                orden.detalles.map(async (detalle) => {
                  try {
                    const imagen = await getImagenProducto(detalle.productoId);
                    return {
                      ...detalle,
                      imagen: imagen || "/placeholder.png", // o null, según quieras fallback
                      vendedor: detalle.vendedorNombre || "Desconocido"
                    };
                  } catch (e) {
                    console.warn("Error obteniendo imagen del producto", detalle.productoId, e);
                    return null;
                  }
                })
              );

              
              return {
                id: orden.id,
                estado: orden.estado,
                productos: productos.filter(Boolean), // 🧠 evita undefineds
              };
          })
        );

        const activas = ordenesConImagenes.filter((o) => o.estado !== "ENTREGADO");
        const historial = ordenesConImagenes.filter((o) => o.estado === "ENTREGADO");

        setActivas(activas);
        setHistorial(historial);
      } catch (err) {
        console.error("Error al cargar órdenes del usuario:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  return { activas, historial, loading };
}

// src/modules/Ordenes/hooks/useCrearOrden.js
import { useState } from "react";
import { ordenService } from "../services/ordenService";
import { useCartContext } from "../../Cart/context/CartContext";

export function useCrearOrden() {
  const [loading, setLoading] = useState(false);
  const { cartItems, refreshCart } = useCartContext();

  const crearOrden = async ({ userId, direccion, metodoPago }) => {

    console.log("Creando orden con:", { userId, direccion, metodoPago });
    setLoading(true);

    console.log("Items del carrito:", cartItems);

    const detalles = cartItems.map((item) => ({
      productoId: item.id,
      nombreProducto: item.title,
      cantidad: item.qty,
      precioUnitario: parseFloat(item.price.replace("$", ""))
    }));

    const total = detalles.reduce(
      (acc, item) => acc + item.cantidad * item.precioUnitario,
      0
    );

    const payload = {
      compradorId: userId,
      total,
      estado: "PENDIENTE",
      detalles,
    };

    try {
      const orden = await ordenService.crearOrden(payload);
      refreshCart(); // limpiar
      return { success: true, orden };
    } catch (err) {
      console.error("Error al crear orden:", err);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { crearOrden, loading };
}

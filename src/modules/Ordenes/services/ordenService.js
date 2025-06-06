// src/modules/Ordenes/services/ordenService.js

const API_URL = import.meta.env.VITE_API_URL

export const ordenService = {
    async crearOrden(payload) {
      const res = await fetch(`${API_URL}/ordenes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("No se pudo crear la orden");
      }
  
      return await res.json(); // devuelve la orden creada
    }
  };
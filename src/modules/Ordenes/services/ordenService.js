// src/modules/Ordenes/services/ordenService.js
export const ordenService = {
    async crearOrden(payload) {
      const res = await fetch("http://localhost:8080/ordenes", {
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
  
const API_URL = import.meta.env.VITE_BANCOSIMPLE_API_URL

export async function pagarProducto({
  nombreTitular,
  numeroTarjeta,
  cvv,
  fechaExpiracionMes,
  fechaExpiracionAnio,
  numeroTarjetaVendedor,
  monto,
  descripcion = "Compra en Ecomarket"
}) {
  const res = await fetch(`${API_URL}/transacciones/comprar`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json" ,
        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
    },
    body: JSON.stringify({
      nombreTitular,
      numeroTarjeta,
      cvv,
      fechaExpiracionMes,
      fechaExpiracionAnio,
      numeroTarjetaVendedor,
      monto,
      descripcion
    })
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Error al procesar el pago");
  }

  return await res.json();
}

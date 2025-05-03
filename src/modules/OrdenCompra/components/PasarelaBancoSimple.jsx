import { useState } from "react";
import { fetchUsuarioPorId } from "../../../services/usuarioService";
import { pagarProducto } from "../../../services/transaccionService";
import { productoService, fetchProductoById } from "../../Catalogo/services/productosService";

export default function PasarelaBancoSimple({ ordenCompra, onPagoExitoso }) {
  const [form, setForm] = useState({
    nombreTitular: "",
    numeroTarjeta: "",
    cvv: "",
    fechaExpiracionMes: "",
    fechaExpiracionAnio: "",
  });

  const [editando, setEditando] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!editando) return; // impedir cambios si está bloqueado
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmarDatos = (e) => {
    e.preventDefault();

    for (const key in form) {
      if (!form[key]) return alert("Por favor completa todos los campos.");
    }

    setEditando(false); // bloquea inputs
  };

  const handlePagar = async (e) => {
    e.preventDefault();

     //validacion de stock
     for (const p of ordenCompra) {
      const id = p.productoId || p.id;
      const cantidadDeseada = p.cantidad || p.qty;
      const producto = await fetchProductoById(id);
    
      if (producto.stock < cantidadDeseada) {
        if (producto.stock === 0) {
          errores.push(`❌ ${item.nombreProducto} está agotado`);
        }else{
          errores.push(`❌ ${item.nombreProducto} solo tiene ${producto.stock} en stock (querías ${item.qty})`);
        }
        navigate("/carrito");
      }
    }

    try {
      setLoading(true);

      for (const producto of ordenCompra) {
        const vendedor = await fetchUsuarioPorId(producto.vendedorId);
        const numeroTarjetaVendedor = vendedor.numeroCuenta;

        const response = await pagarProducto({
          ...form,
          numeroTarjetaVendedor,
          monto: producto.monto,
          descripcion: `Compra de ${producto.nombreProducto}`,
        });
      }

      alert("¡Pago realizado con éxito!");
      onPagoExitoso();
    } catch (err) {
      console.error("Error al pagar:", err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card p-4 shadow-sm">
      <h5 className="fw-bold mb-3">Pago con BancoSimple</h5>

      <div className="mb-3">
        <label className="form-label">Nombre del titular</label>
        <input
          type="text"
          className="form-control"
          name="nombreTitular"
          value={form.nombreTitular}
          onChange={handleChange}
          readOnly={!editando}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Número de tarjeta</label>
        <input
          type="text"
          className="form-control"
          name="numeroTarjeta"
          value={form.numeroTarjeta}
          onChange={handleChange}
          readOnly={!editando}
        />
      </div>

      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Mes expiración</label>
          <input
            type="text"
            className="form-control"
            name="fechaExpiracionMes"
            value={form.fechaExpiracionMes}
            onChange={handleChange}
            readOnly={!editando}
          />
        </div>
        <div className="col">
          <label className="form-label">Año expiración</label>
          <input
            type="text"
            className="form-control"
            name="fechaExpiracionAnio"
            value={form.fechaExpiracionAnio}
            onChange={handleChange}
            readOnly={!editando}
          />
        </div>
        <div className="col">
          <label className="form-label">CVV</label>
          <input
            type="text"
            className="form-control"
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            readOnly={!editando}
          />
        </div>
      </div>

      {editando ? (
        <button
          className="btn btn-outline-primary w-100"
          onClick={handleConfirmarDatos}
        >
          Confirmar datos
        </button>
      ) : (
        <button
          className="btn btn-success w-100"
          onClick={handlePagar}
          disabled={loading}
        >
          {loading ? "Procesando pagos..." : "Comprar"}
        </button>
      )}
    </form>
  );
}

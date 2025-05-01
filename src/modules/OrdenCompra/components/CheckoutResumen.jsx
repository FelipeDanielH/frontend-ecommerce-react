// src/modules/OrdenCompra/components/CheckoutResumen.jsx
import { useCrearOrden } from "../../Ordenes/hooks/useCrearOrden";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../Cart/context/CartContext";
import { productoService, fetchProductoById } from "../../Catalogo/services/productosService";

export default function CheckoutResumen({ productos, metodoPago }) {
  const { user } = useAuth();
  const { crearOrden, loading } = useCrearOrden();
  const navigate = useNavigate();
  const { vaciarCarrito, refreshCart } = useCartContext();

  const handleComprar = async () => {
    if (!metodoPago) {
      alert("Debes seleccionar un método de pago.");
      return;
    }

    for (const p of productos) {
      const id = p.productoId || p.id;
      const cantidadDeseada = p.cantidad || p.qty;
      const producto = await fetchProductoById(id);
    
      if (producto.stock < cantidadDeseada) {
        if (producto.stock === 0) {
          errores.push(`❌ ${item.title} está agotado`);
        }else{
          errores.push(`❌ ${item.title} solo tiene ${producto.stock} en stock (querías ${item.qty})`);
        }
        navigate("/carrito");
      }
    }

    try {
      const detalles = productos.map((p) => ({
        productoId: p.productoId || p.id,
        nombreProducto: p.nombreProducto || p.title,
        cantidad: p.cantidad || p.qty,
        precioUnitario:
          p.precioUnitario ?? parseFloat(p.price?.replace("$", ""))
      }));

      const total = detalles.reduce(
        (acc, item) => acc + item.precioUnitario * item.cantidad,
        0
      );

      const response = await crearOrden({
        userId: user.id,
        total,
        estado: "PENDIENTE",
        detalles
      });

      if (response?.success) {
        // 🔥 Descontar stock en backend 🔥
        for (const detalle of response.orden.detalles) {
          try {
            const producto = await fetchProductoById(detalle.productoId);

            if (producto?.stock != null) {
              const nuevoStock = producto.stock - detalle.cantidad;

              if (nuevoStock >= 0) {
                await productoService.actualizarStock(detalle.productoId, nuevoStock);
              } else {
                console.warn(`Stock insuficiente para el producto ID ${detalle.productoId}`);
              }
            }
          } catch (error) {
            console.error(`Error al actualizar stock del producto ${detalle.productoId}:`, error);
          }
        }

        navigate("/perfil", { state: { seccion: "compras" } });
        await vaciarCarrito();
        await refreshCart();
      } else {
        alert("Hubo un error al crear la orden.");
        console.log({ response });
      }
    } catch (err) {
      console.error("Error al procesar la orden:", err);
      alert("Ocurrió un error al procesar tu orden. Intenta nuevamente.");
    }
  };

  const totalCalculado = productos.reduce((acc, p) => {
    const precio = parseFloat(p.precioUnitario || p.price?.replace("$", ""));
    const cantidad = p.cantidad || p.qty;
    return acc + precio * cantidad;
  }, 0);

  return (
    <div className="card shadow-sm p-3">
      <h6 className="fw-bold mb-3">Resumen del pedido</h6>

      <ul className="list-group mb-3">
        {productos.map((p) => (
          <li
            key={p.productoId || p.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{p.nombreProducto || p.title}</strong>
              <br />
              <small className="text-muted">
                Cantidad: {p.cantidad || p.qty}
              </small>
            </div>
            <span className="text-success fw-bold">
              $
              {(
                (p.precioUnitario ||
                  parseFloat(p.price?.replace("$", ""))) *
                (p.cantidad || p.qty)
              ).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between border-top pt-2">
        <strong>Total</strong>
        <strong className="text-success">
          ${totalCalculado.toFixed(2)}
        </strong>
      </div>
    </div>
  );
}

// src/modules/Ordenes/pages/CheckoutPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../Cart/context/CartContext";
import MetodoPagoForm from "../../OrdenCompra/components/MetodoPagoForm";
import CheckoutResumen from "../../OrdenCompra/components/CheckoutResumen";
import PasarelaBancoSimple from "../../OrdenCompra/components/PasarelaBancoSimple";
import { useCrearOrden } from "../hooks/useCrearOrden";
import { useAuth } from "../../../context/authContext";
import { productoService, fetchProductoById } from "../../Catalogo/services/productosService";

export default function CheckoutPage() {
  const { cartItems, vaciarCarrito, refreshCart } = useCartContext();
  const { crearOrden, loading } = useCrearOrden();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [metodoPago, setMetodoPago] = useState(null);
  const [numerosTarjetaVendedor, setNumerosTarjetaVendedor] = useState([]);
  const [ordenCompra, setOrdenCompra] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/catalogo");
    }


    // Calcular total
    const calc = cartItems.reduce((acc, p) => acc + (p.precioUnitario || parseFloat(p.price?.replace("$", ""))) * (p.cantidad || p.qty), 0);
    setTotal(calc);

  
    const cargarTarjetas = async () => {
      try {

        const ordenes = cartItems.map((item) => {
          return { id: item.id, nombreProducto: item.title, vendedorId: item.vendedor, monto: parseFloat(item.price?.replace("$", "")) * (item.cantidad || item.qty), cantidad: item.qty, stock: item.stock };
        })

        setOrdenCompra(ordenes);
     

      } catch (err) {
        console.error("No se pudo obtener tarjeta del vendedor:", err);
      }
    };


    if (metodoPago === "BancoSimple") {
      cargarTarjetas();
    }
  }, [cartItems, metodoPago]);




  const handlePagoExitoso = async () => {
    const result = await crearOrden({
      userId: user.id,
      direccion: user.direccion,
      metodoPago: "BancoSimple",
    });

    console.log(result);

    if (result.success) {
      // 🔥 Descontar stock en backend 🔥
              for (const detalle of result.orden.detalles) {
                try {
                  const producto = await fetchProductoById(detalle.productoId);

                  console.log("Producto:", producto);
      
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
      alert("Error al crear la orden: " + result.message);
    }
  };

  return (
    <div className="container my-5">
      <h4 className="fw-bold text-center mb-4">Finalizar compra</h4>

      <div className="row">
        <div className="col-md-8">
          <MetodoPagoForm metodoPago={metodoPago} setMetodoPago={setMetodoPago} />

          {metodoPago === "BancoSimple" && (
            <PasarelaBancoSimple
              ordenCompra={ordenCompra}
              onPagoExitoso={handlePagoExitoso}
            />
          )}
        </div>
        <div className="col-md-4">
          <CheckoutResumen productos={cartItems} total={total} />
        </div>
      </div>
    </div>
  );
}

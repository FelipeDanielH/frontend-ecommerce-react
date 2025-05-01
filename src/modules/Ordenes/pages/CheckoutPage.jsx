// src/modules/Ordenes/pages/CheckoutPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../Cart/context/CartContext";
import MetodoPagoForm from "../../OrdenCompra/components/MetodoPagoForm";
import CheckoutResumen from "../../OrdenCompra/components/CheckoutResumen";
import PasarelaBancoSimple from "../../OrdenCompra/components/PasarelaBancoSimple";
import { useCrearOrden } from "../hooks/useCrearOrden";
import { useAuth } from "../../../context/authContext";
import { fetchProductoById } from "../../Catalogo/services/productosService";
import { fetchUsuarioPorId } from "../../../services/usuarioService";

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

    // Obtener tarjeta del primer vendedor (suponemos misma tarjeta para todos)
    const cargarTarjeta = async () => {
      try {

        const producto = await fetchProductoById(cartItems[0].productoId || cartItems[0].id);

        setNumerosTarjetaVendedor(producto?.vendedor?.numeroCuenta);
      } catch (err) {
        console.error("No se pudo obtener tarjeta del vendedor:", err);
      }
    };

    const cargarTarjetas = async () => {
      try {

        const ordenes = cartItems.map((item) => {
          return { nombreProducto: item.title, vendedorId: item.vendedor, monto: parseFloat(item.price?.replace("$", "")) * (item.cantidad || item.qty), cantidad: item.qty };
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

    if (result.success) {
      alert("¡Compra realizada con éxito!");
      await vaciarCarrito();
      await refreshCart();
      navigate("/perfil", { state: { seccion: "compras" } });
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

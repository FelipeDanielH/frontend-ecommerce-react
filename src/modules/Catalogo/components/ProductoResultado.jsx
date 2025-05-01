
import { useProductoImagen } from "../hooks/useProductoImagen";
import { Link } from "react-router-dom";

export default function ProductoResultado({ producto, onClick }) {
  const { imagenUrl } = useProductoImagen(producto.id);

  return (
    <Link
      to={`/producto/${producto.id}`}
      onClick={onClick}
      className="d-flex align-items-center gap-2 p-2 border-bottom text-decoration-none text-dark"
    >
      <img
        src={imagenUrl || "/img/placeholder.jpg"}
        alt={producto.nombre}
        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
      />
      <span>{producto.nombre}</span>
    </Link>
  );
}

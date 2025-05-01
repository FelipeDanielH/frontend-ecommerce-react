//src/modules/Catalogo/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { useProductoImagen } from "../hooks/useProductoImagen";

export default function ProductCard({ producto }) {
  const { imagenUrl, loading } = useProductoImagen(producto.id);

  return (
    <Link to={`/producto/${producto.id}`} className="text-decoration-none text-dark">
      <div className="card h-100 hover-shadow">
        {loading ? (
          <div className="text-center p-4">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : (
          <img
            src={imagenUrl || "/img/placeholder.jpg"}
            className="card-img-top"
            alt={producto.nombre}
            style={{ height: "200px", objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text text-truncate">{producto.descripcion}</p>
          <p className="fw-bold">${producto.precio.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}

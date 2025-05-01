import { useEffect, useState } from "react";
import { fetchProductos } from "../../Catalogo/services/productosService";
import { useProductoImagen } from "../../Catalogo/hooks/useProductoImagen";
import { useNavigate } from "react-router-dom";

function ProductoDestacado({ producto }) {
  const { imagenUrl } = useProductoImagen(producto.id);
  const navigate = useNavigate();

  return (
    <div className="col-6 col-md-3 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img
          src={imagenUrl || "/img/placeholder.jpg"}
          className="card-img-top"
          alt={producto.nombre}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h6 className="card-title">{producto.nombre}</h6>
          <p className="card-text text-purple-custom fw-bold">${producto.precio.toFixed(2)}</p>
          <button
            className="btn btn-sm btn-outline-green-custom w-100"
            onClick={() => navigate(`/producto/${producto.id}`)}
          >
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const todos = await fetchProductos();
        const mezclados = [...todos].sort(() => Math.random() - 0.5);
        setProductos(mezclados.slice(0, 4));
      } catch (err) {
        console.error("Error al cargar productos destacados:", err);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h4 className="mb-4 fw-bold">Productos destacados</h4>

        {loading ? (
          <div className="text-center text-muted">Cargando productos...</div>
        ) : productos.length === 0 ? (
          <div className="text-center text-muted">No hay productos disponibles</div>
        ) : (
          <div className="row">
            {productos.map((producto) => (
              <ProductoDestacado key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

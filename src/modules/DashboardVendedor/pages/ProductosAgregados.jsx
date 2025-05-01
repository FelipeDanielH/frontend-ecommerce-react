import SidebarVendedor from '../components/SidebarVendedor';
import { useProductosVendedor } from '../hooks/useProductosVendedor';
import EditarStockModal from '../components/EditarStockModal';
import { useState } from 'react';
import { useProductoImagen } from '../../Catalogo/hooks/useProductoImagen';

export default function ProductosAgregados() {
  const { productos, loading, refetch } = useProductosVendedor();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const ProductoCard = ({ producto }) => {
    const { imagenUrl } = useProductoImagen(producto.id); // tu propio hook 💪

    return (
      <div className="card mb-3 shadow-sm">
        <div className="row g-0">
          <div className="col-md-3">
            <img
              src={imagenUrl || 'https://via.placeholder.com/150'}
              className="img-fluid rounded-start"
              alt={producto.nombre}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">{producto.nombre}</h5>
              <p className="card-text mb-1">💵 Precio: ${producto.precio}</p>
              <p className="card-text mb-1">📦 Estado: {producto.estado}</p>
              <p className="card-text mb-1">📥 Stock: {producto.stock}</p>
            </div>
          </div>
          <div className="col-md-3 d-flex align-items-center justify-content-center">
            <button
              className="btn btn-outline-primary"
              onClick={() => setProductoSeleccionado(producto)}
            >
              ✏️ Editar stock
            </button>
          </div>
        </div>
      </div>
    );
  };

  const disponibles = productos.filter(p => p.stock > 0);
  const vendidos = productos.filter(p => p.stock === 0);

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <aside className="col-md-3">
          <SidebarVendedor />
        </aside>
        <main className="col-md-9">
          <h3 className="mb-4 fw-bold">Mis productos</h3>

          {loading && <p>Cargando productos...</p>}

          {!loading && (
            <>
              {disponibles.length === 0 && <div className="alert alert-warning">No tienes productos activos.</div>}
              {disponibles.map(p => <ProductoCard key={p.id} producto={p} />)}

              {vendidos.length > 0 && (
                <>
                  <h4 className="mt-4 fw-bold">Vendidos</h4>
                  {vendidos.map(p => <ProductoCard key={p.id} producto={p} />)}
                </>
              )}
            </>
          )}
        </main>
      </div>

      {productoSeleccionado && (
        <EditarStockModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
          onStockUpdated={() => {
            refetch();
            setProductoSeleccionado(null);
          }}
        />
      )}
    </div>
  );
}

// src/modules/DashboardVendedor/pages/CrearProducto.jsx
import CrearProductoForm from '../components/CrearProductoForm';
import SidebarVendedor from '../components/SidebarVendedor';

export default function CrearProducto() {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <aside className="col-md-3">
          <SidebarVendedor />
        </aside>
        <main className="col-md-9">
          <h3 className="mb-4 fw-bold">Publicar nuevo producto</h3>
          <CrearProductoForm />
        </main>
      </div>
    </div>
  );
}

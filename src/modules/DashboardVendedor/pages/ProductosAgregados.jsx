// src/modules/DashboardVendedor/pages/ProductosAgregados.jsx
import SidebarVendedor from '../components/SidebarVendedor';

export default function ProductosAgregados() {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <aside className="col-md-3">
          <SidebarVendedor />
        </aside>
        <main className="col-md-9">
          <h3 className="mb-4 fw-bold">Mis productos</h3>
          <div className="alert alert-info">
            Aquí se listarán tus productos y podrás modificar su stock. 🚧
          </div>
        </main>
      </div>
    </div>
  );
}

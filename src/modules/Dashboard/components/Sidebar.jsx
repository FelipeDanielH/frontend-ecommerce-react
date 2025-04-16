import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="bg-light border-end p-3" style={{ minHeight: '100vh' }}>
      <h6 className="text-uppercase text-muted">Dashboard</h6>
      <ul className="nav flex-column">
        <li className="nav-item"><Link to="/dashboard/cliente/perfil" className="nav-link">Mi Perfil</Link></li>
        <li className="nav-item"><Link to="/dashboard/cliente/compras" className="nav-link">Mis Compras</Link></li>
        <hr />
        <li className="nav-item"><Link to="/dashboard/vendedor/productos" className="nav-link">Mis Productos</Link></li>
        <li className="nav-item"><Link to="/dashboard/vendedor/crear" className="nav-link">Publicar Producto</Link></li>
      </ul>
    </div>
  );
}

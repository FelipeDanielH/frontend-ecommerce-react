// src/modules/DashboardVendedor/components/SidebarVendedor.jsx
import { NavLink } from 'react-router-dom';

export default function SidebarVendedor() {
  return (
    <div className="bg-light border-end vh-100 p-3">
      <h5 className="fw-bold mb-4">Mi Tienda</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <NavLink
            to="/dashboard/crear-producto"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'fw-bold text-primary' : 'text-dark'}`
            }
          >
            🛒 Agregar producto
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/dashboard/productos"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'fw-bold text-primary' : 'text-dark'}`
            }
          >
            📦 Productos agregados
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

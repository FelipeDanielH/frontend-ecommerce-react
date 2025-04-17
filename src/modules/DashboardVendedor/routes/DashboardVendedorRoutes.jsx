// src/modules/DashboardVendedor/routes/DashboardVendedorRoutes.jsx
import { Route, Routes, Navigate } from 'react-router-dom';
import CrearProducto from '../pages/CrearProducto';
import ProductosAgregados from '../pages/ProductosAgregados';
import { useAuth } from '../../../context/authContext';

export default function DashboardVendedorRoutes() {
  const { user } = useAuth();

  if (!user || user.tipo !== 'VENDEDOR') {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="/crear-producto" element={<CrearProducto />} />
      <Route path="/productos" element={<ProductosAgregados />} />
    </Routes>
  );
}

// src/routes/index.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../modules/Home/pages/HomePage';
import CatalogPage from '../modules/Catalogo/pages/CatalogoPage';
import ProductPage from '../modules/Catalogo/pages/ProductPage';
import CartPage from '../modules/Cart/page/CartPage';
import MainLayout from '../components/MainLayout';
import LoginPage from '../modules/Auth/pages/LoginPage';
import RegisterPage from '../modules/Auth/pages/RegisterPage';

import DashboardHome from '../modules/Dashboard/pages/DashboardHome';
import PerfilCliente from '../modules/Dashboard/views/cliente/PerfilCliente';
import ComprasCliente from '../modules/Dashboard/views/cliente/ComprasCliente';
import ProductosVendedor from '../modules/Dashboard/views/vendedor/ProductosVendedor';
import CrearProducto from '../modules/Dashboard/views/vendedor/CrearProducto';
import PerfilRoutes from "../modules/Perfil/routes/PerfilRoutes";
import CheckoutPage from '../modules/Ordenes/pages/CheckoutPage';




export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/producto" element={ <ProductPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/producto/:id" element={<ProductPage />  } />
          <Route path="/perfil" element={<PerfilRoutes />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/dashboard" element={<DashboardHome />}>
            <Route path="cliente/perfil" element={<PerfilCliente />} />
            <Route path="cliente/compras" element={<ComprasCliente />} />
            <Route path="vendedor/productos" element={<ProductosVendedor />} />
            <Route path="vendedor/crear" element={<CrearProducto />} />
          </Route>
          {/* Agregaremos más rutas luego */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

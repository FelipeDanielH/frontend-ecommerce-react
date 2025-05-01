// src\components\Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useCartContext } from "../modules/Cart/context/CartContext";
import { useState, useEffect, useRef } from 'react';

import { useBuscadorProductos } from "../modules/Catalogo/hooks/useBuscadorProductos";
import ProductoResultado from "../modules/Catalogo/components/ProductoResultado";


export default function Navbar() {
  const { user, logout } = useAuth();
  const { cantidadItems } = useCartContext();
  const navigate = useNavigate();

  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const { resultados, loading } = useBuscadorProductos(terminoBusqueda);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // <- referencia al contenedor del dropdown
  const buscadorRef = useRef(null); // <- referencia al input del buscador

  const isComprador = user?.tipo === "COMPRADOR";

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigateCompras = () => {
    navigate("/perfil", { state: { seccion: "compras" } });
    toggleDropdown(); // Cerrar el dropdown al navegar
  }

  const handleNavigatePerfil = () => {
    navigate("/perfil");
    toggleDropdown(); // Cerrar el dropdown al navegar
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Efecto para cerrar el dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (buscadorRef.current && !buscadorRef.current.contains(event.target)) {
        setMostrarResultados(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm bg-green-custom navbar-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-bag-check-fill me-2"></i>EcoMarket
        </Link>

        <div ref={buscadorRef} className="position-relative flex-grow-1 mx-3">
          <input
            className="form-control"
            type="search"
            placeholder="Buscar productos, marcas y más"
            aria-label="Buscar"
            value={terminoBusqueda}
            onChange={(e) => {
              setTerminoBusqueda(e.target.value);
              setMostrarResultados(true);
            }}
          />

          {mostrarResultados && (
            <div
              className="position-absolute bg-white shadow-sm border rounded mt-1 w-100 z-3"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {loading ? (
                <div className="text-center p-2 text-muted">Buscando...</div>
              ) : resultados.length === 0 ? (
                <div className="text-center p-2 text-muted">No hay resultados para esa búsqueda</div>
              ) : (
                resultados.map((prod) => (
                  <ProductoResultado
                    key={prod.id}
                    producto={prod}
                    onClick={() => {
                      setTerminoBusqueda("");
                      setMostrarResultados(false);
                    }}
                  />
                ))
              )}
            </div>
          )}
        </div>

        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-row align-items-center gap-3">

          {!user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Ingresar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Crear cuenta</Link>
              </li>
            </>
          )}

          {user && (
            <>


              {/* Carrito para COMPRADOR */}
              {isComprador && (
                <li className="nav-item position-relative">
                  <Link className="nav-link" to="/carrito">
                    <i className="bi bi-cart4 fs-5"></i>
                    {cantidadItems > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: '0.65rem', transform: 'translate(-50%, -50%)' }}>
                        {cantidadItems}
                      </span>
                    )}
                  </Link>
                </li>
              )}

              {/* Botón "Vender" para VENDEDOR */}
              {!isComprador && (
                <li className="nav-item">
                  <Link to="/dashboard/crear-producto" className="btn btn-outline-dark btn-sm">
                    <i className="bi bi-box-seam me-1"></i> Vender
                  </Link>
                </li>
              )}

              {/* 👋 Saludo visible para todos los usuarios logueados */}
              <li className="nav-item d-none d-md-block">
                <span className="nav-link fw-semibold">Hola, {user.nombre}</span>
              </li>

              {/* Dropdown común */}
              <li className="nav-item dropdown" ref={dropdownRef}>
                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  onClick={toggleDropdown}
                  aria-expanded={dropdownOpen}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="bi bi-person-circle fs-5"></i>
                </span>
                <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}>
                  <li>
                    <button className="dropdown-item" onClick={handleNavigatePerfil}>Perfil</button>
                  </li>
                  {isComprador && (
                    <li>
                      <button className="dropdown-item" onClick={handleNavigateCompras}>Compras</button>
                    </li>
                  )}
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}  

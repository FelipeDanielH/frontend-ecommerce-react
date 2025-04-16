import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useCartContext } from "../modules/Cart/context/CartContext";
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cantidadItems } = useCartContext();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // <- referencia al contenedor del dropdown

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-bag-check-fill me-2"></i>MiPlataforma
        </Link>

        <form className="d-flex flex-grow-1 mx-3" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar productos, marcas y más"
            aria-label="Buscar"
          />
          <button className="btn btn-outline-dark" type="submit">
            Buscar
          </button>
        </form>

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

          {user && isComprador && (
            <>
              {/* Icono del carrito */}
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

              {/* Saludo */}
              <li className="nav-item d-none d-md-block">
                <span className="nav-link fw-semibold">Hola, {user.nombre}</span>
              </li>

              {/* Dropdown de usuario */}
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
                  <li>
                    <button className="dropdown-item" onClick={handleNavigateCompras}>Compras</button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
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

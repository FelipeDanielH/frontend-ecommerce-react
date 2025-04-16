import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setSeccion, seccion, tipoUsuario }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const items = [
    { id: "info", label: "Información personal" },
    { id: "cuenta", label: "Datos de cuenta" },
    ...(tipoUsuario === "COMPRADOR" ? [{ id: "compras", label: "Compras" }] : []),
  ];

  const handleLogout = () => {
    logout(); // limpia context + localStorage
    navigate("/"); // redirige al home
  };

  return (
    <div className="card shadow-sm p-3">
      <h5 className="mb-3 text-center">Mi cuenta</h5>
      <ul className="nav flex-column">
        {items.map((item) => (
          <li className="nav-item" key={item.id}>
            <button
              className={`nav-link btn btn-link text-start ${seccion === item.id ? "fw-bold" : ""}`}
              onClick={() => setSeccion(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
        <li className="nav-item mt-3">
          <button
            className="nav-link btn btn-danger text-start"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
}

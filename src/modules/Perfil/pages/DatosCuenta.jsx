import { useAuth } from "../../../context/authContext";

export default function DatosCuenta() {
  const { user } = useAuth();

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4 text-center">Datos de cuenta</h4>

      <div className="mb-3">
        <div className="card border-0 shadow-sm p-3">
          <h6 className="mb-1 text-muted">Email</h6>
          <p className="fs-6 mb-0">{user.email}</p>
        </div>
      </div>

      <div className="mb-3">
        <div className="card border-0 shadow-sm p-3">
          <h6 className="mb-1 text-muted">Teléfono</h6>
          <p className="fs-6 mb-0">{user.telefono}</p>
        </div>
      </div>

      <div>
        <div className="card border-0 shadow-sm p-3">
          <h6 className="mb-1 text-muted">Dirección</h6>
          <p className="fs-6 mb-0">{user.direccion}</p>
        </div>
      </div>
    </div>
  );
}

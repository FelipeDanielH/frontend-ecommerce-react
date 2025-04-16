import { useAuth } from "../../../context/authContext";

export default function InfoPersonal() {
  const { user } = useAuth();

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4 text-center">Información personal</h4>

      <div className="d-flex flex-column align-items-center text-center">
        <img
          src={`https://ui-avatars.com/api/?name=${user.nombre}&background=random&size=128`}
          alt="Avatar"
          className="rounded-circle shadow-sm mb-3"
          width="128"
          height="128"
        />
        <div>
          <h5 className="mb-1">{user.nombre}</h5>
          <p className="text-muted">Miembro desde 2023</p>
        </div>
      </div>

      <hr className="my-4" />

      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-12">
          <div className="card border-0 shadow-sm p-3">
            <h6 className="mb-1 text-muted">Nombre</h6>
            <p className="fs-5 mb-0">{user.nombre}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

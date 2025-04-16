import { Link } from "react-router-dom";
import useLoginForm from "../hooks/useLoginForm";

export default function LoginForm() {
  const { form, error, handleChange, handleSubmit } = useLoginForm();

  return (
    <div
      className="card shadow-lg border-0 px-4 py-5"
      style={{ maxWidth: "480px", width: "100%", margin: "0 auto" }}
    >
      {/* Logo / Título */}
      <div className="text-center mb-4">
        <img
          src="/logo192.png"
          alt="Logo"
          style={{ width: "60px", height: "60px" }}
        />
        <h3 className="mt-3">Inicia sesión en MiPlataforma</h3>
        <p className="text-muted">Accede con tu cuenta para continuar</p>
      </div>

      {/* Errores */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Correo electrónico</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope-fill"></i>
            </span>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Contraseña</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="d-grid mt-4">
          <button type="submit" className="btn btn-warning btn-lg">
            Iniciar sesión
          </button>
        </div>

        <div className="text-center mt-3">
          <small>
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="text-decoration-none fw-bold">
              Regístrate
            </Link>
          </small>
        </div>
      </form>
    </div>
  );
}